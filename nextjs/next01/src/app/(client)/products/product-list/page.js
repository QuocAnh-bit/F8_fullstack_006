"use client";
import {
  usePathname,
  useRouter,
  useParams,
  useSearchParams,
} from "next/navigation";

export default function page() {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.search.value;
    const valueStatus = e.target.status.value;

    router.push(pathName + `?keywords=${value}&status=${valueStatus}`);
  };
  return (
    <div>
      <h1>Danh sách sản phẩm</h1>
      <h3>Status: {searchParams.get("status")} </h3>
      <h3>Status:{searchParams.get("keywords")} </h3>

      <form action="" onSubmit={handleSubmit}>
        <select name="status" id="">
          <option value="all">ALL</option>
          <option value="active">active</option>
          <option value="inactive">inactive</option>
        </select>
        <input type="search" placeholder="Search..." name="search" />
        <button>Loc</button>
      </form>
    </div>
  );
}
