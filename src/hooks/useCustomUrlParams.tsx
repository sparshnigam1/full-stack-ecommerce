import { usePathname, useRouter, useSearchParams } from "next/navigation";

const useCustomUrlParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setUrlParams = ({
    key,
    val,
  }: {
    key: string;
    val: string | string[];
  }) => {
    const urlParams = new URLSearchParams(searchParams.toString());
    if (Array.isArray(val)) {
      urlParams.delete(key);
      if (val.length > 0) {
        val.forEach((item) => {
          urlParams.append(key, item);
        });
      }
    } else {
      if (typeof val !== "number" && !!val) {
        urlParams.set(key, val as any);
      } else {
        urlParams.delete(key);
      }
    }
    if (!!urlParams.toString()) {
      router.push(`${pathname}?${urlParams.toString()}`);
    } else {
      router.push(pathname);
    }
  };

  const getUrlParam = ({
    key,
    isMulti,
  }: {
    key: string;
    isMulti?: boolean;
  }) => {
    const urlParams = new URLSearchParams(searchParams.toString());
    return isMulti ? urlParams.getAll(key) : urlParams.get(key);
  };

  const setMultipleUrlParams = (
    params: Record<string, string | string[] | null>
  ) => {
    const urlParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, val]) => {
      urlParams.delete(key);

      if (!val) return;

      if (Array.isArray(val)) {
        val.forEach((v) => urlParams.append(key, v));
      } else {
        urlParams.set(key, val);
      }
    });

    const query = urlParams.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return { getUrlParam, setUrlParams, setMultipleUrlParams } as const;
};

export default useCustomUrlParams;
