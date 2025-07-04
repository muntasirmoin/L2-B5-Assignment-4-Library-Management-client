import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useGetBookQuery, useUpdateBookMutation } from "@/redux/api/baseApi";
import { toast } from "sonner";
import type { Genre } from "@/types/interface";
import { Helmet } from "react-helmet-async";

const genres: Genre[] = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
];

const EditBookPage = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const from = (location.state as { from?: string })?.from || "/books";

  const { data: bookData, isLoading: isBookLoading } = useGetBookQuery(id, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const [updateBook, { isLoading }] = useUpdateBookMutation();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [copies, setCopies] = useState<number>(0);
  const [isbn, setIsbn] = useState("");

  useEffect(() => {
    if (bookData?.data) {
      const { title, author, genre, copies, isbn } = bookData.data;
      setTitle(title ?? "");
      setAuthor(author ?? "");

      setGenre(genre ?? "");

      setCopies(copies ?? 0);
      setIsbn(isbn ?? "");
    }
  }, [bookData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateBook({
        id,
        title,
        author,
        genre,
        copies,
        availability: copies > 0 ? "Available" : "unavailable",
      }).unwrap();
      toast.success("Book Edit successfully");
      navigate(from);
    } catch (err) {
      toast.error(`Failed to Edit book: ${err || "Unknown error"}`);
      console.error("Failed to Edit book:", err);
    }
  };

  if (isBookLoading) return <p>Loading book...</p>;

  return (
    <>
      <Helmet>
        <title>Edit| Book!Nest </title>
      </Helmet>
      <div className="border border-gray-200 bg-[#fcfbfb] p-1 ">
        <h2 className="text-2xl mt-2 sm:text-3xl md:text-4xl font-extrabold text-center bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-transparent bg-clip-text">
          Edit Book Details
        </h2>

        <p className="text-xl font-semibold sm:text-base text-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text mt-1">
          Update the information of selected book to keep the library accurate!
        </p>
        <div className="max-w-md mx-auto p-6 mt-5 mb-5  bg-white rounded shadow">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Title:</label>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Author:</label>
              <Input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="genre" className="block font-medium mb-1">
                Genre:
              </label>
              <select
                id="genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                required
                className="w-full border rounded px-3 py-2"
              >
                <option value="" disabled>
                  Select a genre
                </option>
                {genres.map((g) => (
                  <option key={g} value={g}>
                    {g.replace("_", " ")}
                  </option>
                ))}
              </select>
            </div>

            {/* <div>
          <label className="block font-medium mb-1">Genre:</label>
          <Input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </div> */}

            <div>
              <label className="block font-medium mb-1">Copies:</label>
              <Input
                type="number"
                min={0}
                value={copies === 0 ? "0" : copies}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "") {
                    setCopies(0);
                  } else {
                    setCopies(Number(val));
                  }
                }}
                required
              />
            </div>

            <div>
              <p className="text-sm font-medium">
                Availability:{" "}
                <span
                  className={copies > 0 ? "text-green-600" : "text-red-600"}
                >
                  {copies > 0 ? "Available" : "Unavailable"}
                </span>
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600">
                ISBN: <span className="font-mono">{isbn || "N/A"}</span>
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-green-600  hover:bg-green-700 hover:text-white cursor-pointer"
              >
                {isLoading ? "Saving..." : "Save"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate(from)}
                className="flex-1 bg-red-600  hover:bg-red-700 hover:text-white cursor-pointer"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditBookPage;
