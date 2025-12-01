
ter">
      <div className="bg-white shadow-sm shadow-color-red p-10 md:w-1/2 lg:w-full mx-auto rounded">
        <h1 className="text-2xl font-bold mb-10 text-center font-hobo text-color-red">
          Add Category
        </h1>
        <form onSubmit={submitHandler}>
          {/* select field for in which admin want to add banner eg: slide1 or slide2 */}

          <div className="flex items-center mb-10">
            <label
              htmlFor="slide"
              className="w-40 inline-block mr-4 text-gray-500"
            >
              Your Category
            </label>
            <input
              type="text"
              className="border-b-2 border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-color-red"
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center mb-10">
            <label
              htmlFor="slide"
              className="w-40 inline-block mr-4 text-gray-500"
            >
              Category Position
            </label>
            <input
              type="number"
              className="border-b-2 border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-color-red"
              onChange={(e) => setCategoryPosition(e.target.value)}
              value={categoryPosition}
            />
          </div>
          <div className="flex items-center mb-10">
            <label
              htmlFor="category"
              className="w-40 inline-block mr-4 text-gray-500"
            >
              Category Image
            </label>
            <input
              id="category"
              type="file"
              className="border-b-2 border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-color-red"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <div className="text-right">
            <button
              type="submit"
              className="bg-color-red text-white px-10 py-2 rounded-full font-hobo hover:shadow-sm"
              disabled={loading}
            >
              {loading ? "Adding Category..." : "Add Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategories;
