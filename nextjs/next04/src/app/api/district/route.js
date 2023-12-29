import district from "@/app/data/quan_huyen.json";

export function GET(request) {
  const provinceId = request.nextUrl.searchParams.get("province_id");
  if (!provinceId) {
    return Response.json({ error: "error" });
  }
  let districtArr = Object.values(district);
  districtArr
    .filter((item) => item.parent_code === provinceId)
    .sort((a, b) => a.code - b.code);

  return Response.json({
    status: "success",
    districtArr,
  });
}
