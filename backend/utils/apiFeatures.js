class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {};

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        // Create a copy of the queryStr object
        let queryStrCpy = { ...this.queryStr };

        // Fields to remove from the query string
        const removeFields = ["keyword", "limit", "page"];
        removeFields.forEach((field) => delete queryStrCpy[field]);

        // Convert query string to JSON string
        let queryStr = JSON.stringify(queryStrCpy);

        // Add $ sign to mongoose operators (gt, gte, lt, lte)
        queryStr = queryStr.replace(/\b(gt|lt|gte|lte)\b/g, match => `$${match}`);

      

        // Parse the query string back to JSON and apply to the query
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    paginate(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
    
}

module.exports = ApiFeatures;
