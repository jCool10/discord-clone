import { useQuery } from "@tanstack/react-query";

interface Props {
  queryKey: string[];
  queryFn: () => Promise<any>;
}

export const useQueryData = ({ queryKey, queryFn }: Props) => {
  const { data, status } = useQuery({
    queryKey,
    queryFn,
  });
  return { data, status };
};
