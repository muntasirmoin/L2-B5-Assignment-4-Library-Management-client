import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCreateBookMutation } from "@/redux/api/baseApi";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type Genre =
  | "FICTION"
  | "NON_FICTION"
  | "SCIENCE"
  | "HISTORY"
  | "BIOGRAPHY"
  | "FANTASY";

const genres: Genre[] = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
];

const CreateBook = () => {
  const navigate = useNavigate();
  const [createBook, { isLoading }] = useCreateBookMutation();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState<Genre | "">("");
  const [isbn, setIsbn] = useState("");
  const [description, setDescription] = useState("");
  const [copies, setCopies] = useState<number | "">(0);
  const [available, setAvailable] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!genre) {
      toast.error("Please select a genre");
      return;
    }

    if (copies === "" || copies < 0) {
      toast.error("Copies must be 0 or more");
      return;
    }

    try {
      await createBook({
        title,
        author,
        genre,
        isbn,
        description: description || undefined,
        copies: Number(copies),
        available,
      }).unwrap();

      toast.success("Book created successfully");
      navigate("/"); // Redirect to book  page
    } catch (error) {
      toast.error("Failed to create book");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted">
      <Card className="w-full max-w-xl shadow-lg">
        <CardHeader>
          <CardTitle>Create New Book</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block mb-1 font-medium">
                Title <span className="text-red-500">*</span>
              </label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Enter book title"
              />
            </div>

            {/* Author */}
            <div>
              <label htmlFor="author" className="block mb-1 font-medium">
                Author <span className="text-red-500">*</span>
              </label>
              <Input
                id="author"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                placeholder="Enter author name"
              />
            </div>

            {/* Genre */}
            <div>
              <label htmlFor="genre" className="block mb-1 font-medium">
                Genre <span className="text-red-500">*</span>
              </label>
              <Select
                onValueChange={(value) => setGenre(value as Genre)}
                value={genre}
                required
              >
                <SelectTrigger id="genre" className="w-full">
                  <SelectValue placeholder="Select a genre" />
                </SelectTrigger>
                <SelectContent>
                  {genres.map((g) => (
                    <SelectItem key={g} value={g}>
                      {g.replace("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* ISBN */}
            <div>
              <label htmlFor="isbn" className="block mb-1 font-medium">
                ISBN <span className="text-red-500">*</span>
              </label>
              <Input
                id="isbn"
                type="text"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                required
                placeholder="Enter ISBN"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block mb-1 font-medium">
                Description
              </label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional description"
                rows={3}
              />
            </div>

            {/* Copies */}
            <div>
              <label htmlFor="copies" className="block mb-1 font-medium">
                Copies <span className="text-red-500">*</span>
              </label>
              <Input
                id="copies"
                type="number"
                min={0}
                value={copies}
                onChange={(e) => {
                  const val = e.target.value;
                  setCopies(val === "" ? "" : Number(val));
                }}
                required
                placeholder="Number of copies"
              />
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2">
              <input
                id="available"
                type="checkbox"
                checked={available}
                onChange={(e) => setAvailable(e.target.checked)}
                className="cursor-pointer"
              />
              <label htmlFor="available" className="cursor-pointer select-none">
                Available
              </label>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-green-600  hover:bg-green-700 hover:text-white cursor-pointer"
              >
                {isLoading ? "Creating..." : "Create Book"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="flex-1 bg-red-600  hover:bg-red-700 hover:text-white cursor-pointer"
                onClick={() => navigate("/")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateBook;
