import React, { useState } from "react";

const problems = [
  { id: 1, title: "Sum of Two Numbers", description: "Given two integers a and b, return their sum." },
  { id: 2, title: "Binary Search", description: "Implement binary search on a sorted array." },
  { id: 3, title: "Factorial", description: "Compute the factorial of a given number n." },
  { id: 4, title: "Fibonacci", description: "Print the nth Fibonacci number." },
  { id: 5, title: "Palindrome Check", description: "Check if a given string is a palindrome." },
  { id: 6, title: "Maximum Subarray", description: "Find the contiguous subarray with the largest sum." },
  { id: 7, title: "GCD", description: "Find the greatest common divisor of two numbers." },
  { id: 8, title: "Reverse String", description: "Reverse a given string." },
  { id: 9, title: "Anagram Check", description: "Check if two strings are anagrams." },
  { id: 10, title: "Matrix Transpose", description: "Transpose a given matrix." }
];

const App = () => {
  const [activePage, setActivePage] = useState("home");
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [language, setLanguage] = useState("cpp");

  const showPage = (id) => {
    setSelectedProblem(null);
    setActivePage(id);
  };

  return (
    <div className="bg-[#000000] min-h-screen text-white font-[Inter] flex flex-col justify-between">
      {/* Navbar */}
      <nav className="fixed top-0 w-full h-16 bg-[#000000] text-white px-6 py-4 flex justify-between items-center">
      
        <img src="/Image/Logo.jpg" alt="HKTOJ logo" className="h-16 object-contain absolute top-0 left-0"/>

        <h1 className="text-xl font-semibold"></h1>
        <ul className="flex gap-4 font-semibold justify-center flex-1">
          {['home', 'problems', 'learning path', 'blogs', 'ranking', 'contact us'].map((id) => (
            <li key={id}>
              <button onClick={() => showPage(id)} className="hover:opacity-80 capitalize">
                {id}
              </button>
            </li>
          ))}
        </ul>
        <div className="flex gap-2">
          <button className="text-white hover:underline">Login</button>
          <button className="text-white hover:underline">Register</button>
        </div>
      </nav>

      {/* Main content */}
      <main className="bg-[#000000] mt-20 p-6 space-y-8 flex-grow mb-20">
        {activePage === "home" && (
          <div>
          <Section className="bg-[#0f1f3b] text-white p-6 rounded-2xl shadow" title="Welcome to HKTOJ!">
            <p className="text-lg">
              Train your algorithm skills with real problems, automatic grading, and smart learning paths.
            </p>
          </Section>
          <br />
          <Section className="bg-[#0f1f3b] p-6 rounded-2xl shadow" title="Kì thi HKTOJ - Vòng 1">
          <p className="text-lg">
            Đăng vào 15:00 Ngày 10 tháng 4 năm 2025 <br />
            Kì thi tiếp theo HKTOJ sẽ diễn ra vào ngày Thứ Hai, 14/04/2025 20:00:00<br />
            Thể thức của kì thi là ICPC. <br />
            Đề thi gồm 6 bài, kéo dài 2 tiếng 30 phút, theo thể thức ICPC. <br />
            Truy cập kì thi tại đây.
            </p>
          </Section>
          <br />
          <Section className="bg-[#0f1f3b] p-6 rounded-2xl shadow" title="Kết quả kì thi HKTOJ - Vòng 0">
            <p className="text-lg">
              Đăng vào 03:18 Ngày 20 tháng 1 năm 2025<br />
              Kì thi đã kết thúc với top 3 thuộc về, mỗi người nhận được một áo phông MarisaOJ:
            </p>

            <ol className="list-decimal list-inside ml-6 my-2 text-base">
              <li>qiocas (440 điểm)</li>
              <li>abcdxyz123 (440 điểm)</li>
              <li>HoangMC2009 (360 điểm)</li>
            </ol>

            <p className="text-lg mt-4">
              3 thí sinh may mắn, mỗi người cũng sẽ nhận được một áo phông MarisaOJ:
            </p>

            <ol className="list-decimal list-inside ml-6 my-2 text-base">
              <li>mduc209</li>
              <li>thaibeo123</li>
              <li>K.Niva</li>
            </ol>

            <p className="text-lg mt-4">
              Xin chúc mừng các bạn và tất cả các thí sinh đã tham gia kì thi.
            </p>
          </Section>

          <br />
          <Section className="bg-[#0f1f3b] p-6 rounded-2xl shadow" title="HKT Online Judge đã cán mốc 500 bài nộp!">
          <p className="text-lg">
            Đăng vào 08:23 Ngày 21 tháng 5 năm 2024 <br />
            Nhân dịp HKTOJ đạt mốc 500 bài nộp, một sự kiện giveaway nho nhỏ được tổ chức ở server Discord của HKTOJ: <br />
            Phần quà của sự kiện lần này là hai fumo Marisa (bootleg): <br />
            Hãy truy cập vào server Discord để xem thể lệ sự kiện. Sự kiện kéo dài trong vòng một tuần, đừng bỏ lỡ nhé! <br />
            </p>
          </Section>
          </div>
        )}

        {activePage === "problems" && (
          selectedProblem ? (
            <Section title={selectedProblem.title}>
              {/* NOTE: Đây là phần hiển thị đề bài */}
              <p className="mb-4 text-white whitespace-pre-line">{selectedProblem.description}</p>

              {/* NOTE: Đây là phần người dùng nhập code để nộp */}
              <textarea
                rows="10"
                className="text-[#0f1f3b] w-full p-4 rounded border border-gray-300"
                placeholder="Write your code here..."
              ></textarea>
              {/* text-[#0f1f3b] */}
              <div className="my-4">
                <label htmlFor="lang" className="text-white block mb-1 font-medium">Language</label>
                <select 
                  id="lang" 
                  className="p-2 rounded border border-gray-300 text-[#0f1f3b]" 
                  value={language} 
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option className="text-[#0f1f3b]" value="cpp">C++</option>
                  <option className="text-[#0f1f3b]" value="python">Python</option>
                  <option className="text-[#0f1f3b]" value="java">Java</option>
                </select>
              </div>
              <button onClick={() => alert("Code submitted!")} className="bg-[#4a78a6] text-white px-6 py-2 rounded">
                Submit
              </button>
              <button onClick={() => setSelectedProblem(null)} className="ml-4 underline text-sm">← Back to problems</button>
            </Section>
          ) : (
            <Section title="Practice Problems">
              {problems.map((p) => (
                <Problem key={p.id} title={p.title} onClick={() => setSelectedProblem(p)} />
              ))}
            </Section>
          )
        )}

        {activePage === "learning path" && (
          <div>
            <Section className="bg-blue-600 text-white" title="General">
              <p className="text-lg">
                You don't have to complete all the modules in this section before moving on to Bronze. <br />
                Feel free to mark some as "skipped" and revisit them at a later time! <br />
              </p>
            </Section>
            <br />
            <Section className="bg-[#a64d16] text-white" title="Bronze">
              <p className="text-lg">
                The topics below are not exhaustive for this division. <br />
                Contest problems may contain topics not covered in the guide, or topics listed under different divisions! <br />
                If you prefer videos instead of text, check out CPI's free self-study Bronze course. <br />
              </p>
            </Section>
            <br />
            <Section className="bg-[#1c664c] text-white" title="Silver">
              <p className="text-lg">
                The topics below are not exhaustive for this division.<br />
                Contest problems may contain topics not covered in the guide, or topics listed under different divisions! <br />
              </p>
            </Section>
            <br />
            <Section className="bg-[#8f6f06] text-white" title="Gold">
              <p className="text-lg">
                The topics below are not exhaustive for this division. <br />
                Contest problems may contain topics not covered in the guide, or topics listed under different divisions! <br />
              </p>
            </Section>
            <br />
            <Section className="bg-[#9d07ad] text-white" title="Platinum">
              <p className="text-lg">
                The topics below are not exhaustive for this division. <br />
                Contest problems may contain topics not covered in the guide, or topics listed under different divisions! <br />
                Some lower-frequency topics are included in "Advanced." <br />
              </p>
            </Section>
            <br />
            <Section className="bg-[#ba0019] text-white" title="Advanced">
              <p className="text-lg">
                Some of these topics have not appeared in Platinum and probably never will (ex. Matroid Intersection). <br />
                Others have appeared in Old Gold or Platinum very infrequently (ex. BCC, Suffix Array). <br />
              </p>
            </Section>
            <br />
          </div>
        )} 

        {activePage === "blogs" && (
          <Section className="bg-[#0f1f3b] text-white" title="Theory Lessons">
            <p className="text-lg mb-4">Learn Sorting, Recursion, DP and more with structured lessons.</p>
            <button className="bg-[#4a78a6] text-white px-4 py-2 rounded" onClick={() => alert("Open lesson")}>Learn Now</button>
          </Section>
          
        )}

        {activePage === "ranking" && (
          <Section className="bg-[#0f1f3b] text-white" title="Ranking">
            <ol className="space-y-1">
              <li>🥇 Alice - 320 pts</li>
              <li>🥈 Bob - 300 pts</li>
              <li>🥉 Charlie - 270 pts</li>
            </ol>
          </Section>
        )}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full bg-[#0f1f3b] text-white text-center p-4 text-sm text-[#1b2232]">
        HKT Online Judge - A platform for students and programming enthusiasts to practice algorithms.
      </footer>
    </div>
  );
};

const Section = ({ title, children, className = "" }) => (
  <section className={`p-6 rounded-2xl shadow ${className}`}>
    <h2 className="text-2xl font-semibold mb-4">{title}</h2>
    {children}
  </section>
);


const Problem = ({ title, onClick }) => (
  <div className="flex justify-between items-center bg-[#0f1f3b] text-white p-4 rounded shadow mb-2">
    <span>{title}</span>
    <button onClick={onClick} className="bg-[#4a78a6] text-white px-4 py-1 rounded">
      Solve
    </button>
  </div>

);

export default App;
