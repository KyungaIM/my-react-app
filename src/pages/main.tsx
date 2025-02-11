import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { todoApi } from '../entities/todo';

interface Todo {
  id: number;
  title: string;
  content: string;
  check: boolean;
}

export default function MainPage() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<Todo[]>([]);
  
  const fetchTodos = async () => {
    try {
      const response = await todoApi.fetchTodos();
      setTodos(response);
    } catch (error) {
      console.error('할 일 목록을 불러오는데 실패했습니다:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">메인 페이지</h1>
        <div className="space-x-2">
          <button 
            onClick={fetchTodos}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            새로고침
          </button>
          <button 
            onClick={() => navigate('/edit')}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            새 할일 추가
          </button>
        </div>
      </div>
      <div className="space-y-4">
        {todos.map((todo) => (
          <div key={todo.id} className="flex space-x-4">
            <input 
              type="checkbox" 
              checked={todo.check}
              readOnly
            />
            <span>{todo.title}</span>
            <button 
              onClick={() => navigate(`/edit/${todo.id}`)}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              수정
            </button>
            <button 
              onClick={() => navigate(`/content/${todo.id}`)}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              상세보기
            </button>
          </div>
        ))}
      </div>
    </div>
  )
} 