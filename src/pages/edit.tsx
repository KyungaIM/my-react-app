import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { todoApi } from '../entities/todo';

export default function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchTodo = async () => {
      if (!id) return;
      
      try {
        const todo = await todoApi.fetchTodoById(Number(id));
        setTitle(todo.title);
        setContent(todo.content);
      } catch (error) {
        console.error('할 일을 불러오는데 실패했습니다:', error);
      }
    };

    fetchTodo();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        // 수정 로직
        await todoApi.updateTodo(Number(id), {
          title,
          content,
        });
      } else {
        // 추가 로직
        await todoApi.createTodo({
          title,
          content,
          check: false
        });
      }
      navigate('/');
    } catch (error) {
      console.error(id ? '할 일 수정에 실패했습니다:' : '할 일 생성에 실패했습니다:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">할 일 {id ? '수정' : '추가'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded h-32"
            required
          />
        </div>
        <div className="space-x-2">
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            저장
          </button>
        </div>
      </form>
    </div>
  );
} 