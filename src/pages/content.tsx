import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Todo } from '../entities/todo/model';
import { todoApi } from '../entities/todo/api';

export default function ContentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const todos = await todoApi.fetchTodos();
        const foundTodo = todos.find(t => t.id === Number(id));
        if (foundTodo) {
          setTodo(foundTodo);
        }
      } catch (error) {
        console.error('할일을 불러오는데 실패했습니다:', error);
      }
    };
    fetchTodo();
  }, [id]);

  if (!todo) {
    return <div>로딩중...</div>;
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-2">{todo.title}</h1>
        <div className="flex items-center text-gray-600 mb-4">
          <span className={`px-2 py-1 rounded ${todo.check ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
            {todo.check ? '완료' : '진행중'}
          </span>
        </div>
        <p className="whitespace-pre-wrap">{todo.content}</p>
      </div>
      <div className="space-x-2">
        <button
          onClick={() => navigate(`/edit/${todo.id}`)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          수정
        </button>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          목록으로
        </button>
      </div>
    </div>
  );
} 