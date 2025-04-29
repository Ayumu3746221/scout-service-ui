import { JobPostingList } from "@/components/job_postings/JobPostingList";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container py-12 w-[80%] mx-auto">
          <h1 className="text-3xl font-bold">インターンマッチへようこそ</h1>
          <p className="mt-4 pb-0.5 text-muted-foreground">
            あなたに最適なインターンシップを見つけましょう
          </p>
          <JobPostingList />
        </div>
      </main>
    </div>
  );
}
