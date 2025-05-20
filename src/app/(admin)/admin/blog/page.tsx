import BlogPostTable from "./blog-list";

export default function BlogPage() {
  return (
    <div className=" mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <div>
        
      </div>
      <BlogPostTable
      // onEdit={(id) => console.log(`Edit post ${id}`)}
      // onDelete={(id) => console.log(`Delete post ${id}`)}
      // onView={(id) => console.log(`View post ${id}`)}
      />
    </div>
  );
}
