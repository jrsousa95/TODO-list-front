import { useToast } from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 60 * 1000, // 1 minuto
});

type UseFetchPropsTypeType<T> = {
  method: "get" | "post" | "put" | "patch" | "delete";
  url: string;
  data?: T;
  authenticated?: boolean;
  token?: string;
  autoFetch?: boolean;
  responseType?:
    | "json"
    | "blob"
    | "arraybuffer"
    | "document"
    | "text"
    | "stream";
};

export default function useFetch<T, E = unknown>(
  props: UseFetchPropsTypeType<T>
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(props.autoFetch);
  const [error, setError] = useState<AxiosError<E> | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const toast = useToast();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("AUTH_TOKEN");

      const response = await api({
        method: props.method,
        url: props.url,
        data: props.data,
        headers: props.authenticated
          ? {
              Authorization: `Bearer ${token ? token : props.token}`,
            }
          : {},
        responseType: props.responseType || "json",
      });

      setData(response.data);
    } catch (error) {
      setError(error as AxiosError<E>);

      toast({
        title: "Erro na requisição",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    } finally {
      setLoading(false);
    }
  }, [
    props.method,
    props.url,
    props.data,
    props.authenticated,
    props.token,
    props.responseType,
    toast,
  ]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && props.autoFetch) {
      fetchData();
    }
  }, [fetchData, isMounted, props.autoFetch]);

  return { data, loading, error, fetchData };
}
