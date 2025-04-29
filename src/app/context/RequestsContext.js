import { notificationsApi } from "@/lib/notificationsApi";
import { requestsApi } from "@/lib/requestsApi";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const RequestsContext = createContext(null);

export function RequestsProvider({ children }) {
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [counts, setCounts] = useState({
    ALL: 0,
    PENDING: 0,
    COMPLETED: 0,
    FAILED: 0,
  });
  const [requestsCache, setRequestsCache] = useState({
    ALL: { data: [], offset: 0, hasMore: true },
    PENDING: { data: [], offset: 0, hasMore: true },
    COMPLETED: { data: [], offset: 0, hasMore: true },
    FAILED: { data: [], offset: 0, hasMore: true },
  });

  const fetchInProgressRef = useRef(false);
  const limit = 10;

  const fetchCounts = useCallback(async () => {
    try {
      const response = await requestsApi.getRequestsCounts();
      if (response?.items && response.items.length > 0) {
        const statusCounts = JSON.parse(response.items[0].status_counts);
        setCounts(statusCounts);
      }
    } catch (err) {
      console.error("Error loading counts:", err);
    }
  }, []);

  const fetchRequests = useCallback(
    async (reset = false, filterParam) => {
      const currentFilter = filterParam || activeFilter;
      if (fetchInProgressRef.current || (loading && !reset)) return;
      try {
        fetchInProgressRef.current = true;
        setLoading(true);

        const currentOffset = reset
          ? 0
          : requestsCache[currentFilter].offset || 0;

        const requestsResponse = await requestsApi.getRequests(
          currentOffset,
          limit,
          currentFilter
        );
        const newRequests = requestsResponse.items || [];
        const newHasMore = requestsResponse.hasMore || false;
        const newOffset = currentOffset + limit;

        if (newRequests.length > 0) {
          const notificationsResponse =
            await notificationsApi.getNotifications();
          const notificationsData = notificationsResponse?.items || [];
          const requestIdsWithNotifications = new Set(
            notificationsData.map((n) => n.request_id)
          );
          const processedRequests = newRequests.map((request) => ({
            ...request,
            hasUnreadNotification: requestIdsWithNotifications.has(
              request.request_id
            ),
          }));

          setRequestsCache((prevCache) => {
            const updatedCache = { ...prevCache };
            if (reset) {
              updatedCache[currentFilter] = {
                data: [...processedRequests],
                offset: newOffset,
                hasMore: newHasMore,
              };
            } else {
              updatedCache[currentFilter] = {
                data: [...prevCache[currentFilter].data, ...processedRequests],
                offset: newOffset,
                hasMore: newHasMore,
              };
            }

            updatedCache[currentFilter].data = Array.from(
              new Map(
                updatedCache[currentFilter].data.map((item) => [
                  item.request_id,
                  item,
                ])
              ).values()
            ).sort((a, b) => new Date(b.start_date) - new Date(a.start_date));

            return updatedCache;
          });

          if (reset) {
            setFilteredRequests([...processedRequests]);
          } else {
            setFilteredRequests((prev) => {
              const combined = [...prev, ...processedRequests];
              return Array.from(
                new Map(
                  combined.map((item) => [item.request_id, item])
                ).values()
              ).sort((a, b) => new Date(b.start_date) - new Date(a.start_date));
            });
          }
        } else {
          if (reset) {
            setFilteredRequests([]);
          }
        }

        setHasMore(newHasMore);
        setOffset(newOffset);

        if (reset || initialLoad) {
          await fetchCounts();
        }
      } catch (err) {
        console.error("Error loading data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
        fetchInProgressRef.current = false;
        if (initialLoad) setInitialLoad(false);
      }
    },
    [loading, activeFilter, requestsCache, limit, initialLoad, fetchCounts]
  );

  const refreshRequests = useCallback(async () => {
    if (fetchInProgressRef.current) return;
    try {
      fetchInProgressRef.current = true;

      const filters = ["ALL", "PENDING", "COMPLETED", "FAILED"];
      const apiCalls = filters.map((filter) =>
        requestsApi.getRequests(0, limit, filter)
      );

      const responses = await Promise.all(apiCalls);

      setRequestsCache((prevCache) => {
        const updatedCache = { ...prevCache };

        filters.forEach((filter, index) => {
          const newRequests = responses[index].items || [];

          updatedCache[filter].data = newRequests;

          updatedCache[filter].hasMore = responses[index].hasMore || false;
          updatedCache[filter].offset = limit;
        });

        return updatedCache;
      });

      const activeFilterIndex = filters.indexOf(activeFilter);
      const activeFilterResponse = responses[activeFilterIndex];
      const newRequests = activeFilterResponse.items || [];

      setFilteredRequests(newRequests);

      await fetchCounts();
    } catch (err) {
      console.error("Error refreshing data:", err);
    } finally {
      fetchInProgressRef.current = false;
    }
  }, [activeFilter, limit, fetchCounts]);

  const handleFilterChange = useCallback(
    (filter) => {
      if (filter === activeFilter) return;

      setFilteredRequests([]);

      setActiveFilter(filter);

      if (requestsCache[filter].data.length > 0) {
        setFilteredRequests(requestsCache[filter].data);
        setOffset(requestsCache[filter].offset);
        setHasMore(requestsCache[filter].hasMore);
        setLoading(false);
      } else {
        setHasMore(true);
        setOffset(0);

        fetchRequests(true, filter);
      }
    },
    [activeFilter, requestsCache, fetchRequests]
  );

  useEffect(() => {
    let mounted = true;
    if (mounted && initialLoad) {
      fetchRequests(true);
    }
    return () => {
      mounted = false;
    };
  }, [fetchRequests, initialLoad]);

  const value = {
    requests: filteredRequests,
    filteredRequests,
    loading,
    error,
    hasMore,
    offset,
    activeFilter,
    counts,
    initialLoad,
    fetchRequests,
    refreshRequests,
    handleFilterChange,
  };

  return (
    <RequestsContext.Provider value={value}>
      {children}
    </RequestsContext.Provider>
  );
}

export function useRequests() {
  const context = useContext(RequestsContext);
  if (context === null) {
    throw new Error("useRequests must be used within a RequestsProvider");
  }
  return context;
}
