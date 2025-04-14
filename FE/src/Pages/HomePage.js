import React from "react";
import Section from "../Components/Section";

const HomePage = () => {
  return (
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
          Kì thi đã kết thúc với top 3 thuộc về, mỗi người nhận được một áo phông HKTOJ:
        </p>

        <ol className="list-decimal list-inside ml-6 my-2 text-base">
          <li>qiocas (440 điểm)</li>
          <li>abcdxyz123 (440 điểm)</li>
          <li>HoangMC2009 (360 điểm)</li>
        </ol>

        <p className="text-lg mt-4">
          3 thí sinh may mắn, mỗi người cũng sẽ nhận được một áo phông HKTOJ:
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
    </div>
  );
};

export default HomePage;
