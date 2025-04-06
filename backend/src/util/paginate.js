import mongoose from "mongoose";

export async function paginate(
  model,
  query = {},
  page = 1,
  pageSize = 10,
  populateField = null
) {
  const skip = (page - 1) * pageSize;

  let dbQuery = mongoose.model(model).find(query);

  if (populateField) {
    dbQuery = dbQuery.populate(populateField);
  }

  const records = await dbQuery
    .sort({ createdAt: "desc" })
    .skip(skip)
    .limit(pageSize)
    .exec();

  const totalCount = await mongoose.model(model).countDocuments(query);
  const totalPages = Math.ceil(totalCount / pageSize);

  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  return {
    currentPage: page,
    totalPages,
    hasNextPage,
    hasPrevPage,
    nextPage: hasNextPage ? page + 1 : null,
    prevPage: hasPrevPage ? page - 1 : null,
    records,
  };
}
