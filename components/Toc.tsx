import { useState } from "react";

const dummyData = [
  { id: 1, title: "Introduction to AI", content: "AI is the simulation of human intelligence in machines..." },
  { id: 2, title: "Machine Learning Basics", content: "Machine learning is a subset of AI that enables systems to learn..." },
  { id: 3, title: "Deep Learning Overview", content: "Deep learning is a class of ML that uses neural networks..." },
];

export default function Toc() {
  const [selectedTopic, setSelectedTopic] = useState(dummyData[0]);

  return (
    <div className="bg-gray-100 p-4 rounded-lg border w-full">
      <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
      <ul>
        {dummyData.map((topic) => (
          <li
            key={topic.id}
            className={`p-2 cursor-pointer rounded-lg hover:bg-gray-200 transition ${
              selectedTopic.id === topic.id ? "bg-blue-300" : ""
            }`}
            onClick={() => setSelectedTopic(topic)}
          >
            {topic.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
