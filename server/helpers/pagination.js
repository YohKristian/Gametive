const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = (page - 1) * limit;
    return { limit, offset }
}

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: products } = data;
    const currentPage = page ? +page : 0
    const totalPages = Math.ceil(totalItems / limit)
    return { totalItems, products, totalPages, currentPage }
}

module.exports = {
    getPagination,
    getPagingData
}