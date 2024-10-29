import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider, Input } from "@nextui-org/react";
import { FormEvent, useState } from "react";
import { CiTrash } from "react-icons/ci";
import { IoMdCheckmark } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "./hooks/storeHooks";
import {
  addTodo,
  completeTodo,
  removeTodo,
  returnTodo,
  TodoStatus,
} from "./store/features/todos/todosSlice";
import { TiArrowBack } from "react-icons/ti";
import { motion } from "framer-motion";

export default function App() {
  const todos = useAppSelector((state) => state.todos.todos);
  const dispatch = useAppDispatch();
  const [inputNameTodo, setInputNameTodo] = useState<string>("");
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addTodo({ name: inputNameTodo }));
  };
  const processTodos = todos.filter((todo) => todo.status === "process");
  const completedTodos = todos.filter((todo) => todo.status === "completed");
  const removedTodos = todos.filter((todo) => todo.status === "removed");

  return (
    <div className="max-w-2xl mx-auto py-2">
      <p className="text-5xl text-center p-6 ">Спсиок задач</p>
      <Card>
        <CardBody>
          <p className="text-2xl">Создать задачу</p>
          <form
            className="flex gap-2 my-2 items-end"
            onSubmit={(e) => handleSubmit(e)}
          >
            <Input
              autoCapitalize="on"
              type="text"
              label="Название"
              onChange={(e) => setInputNameTodo(e.target.value)}
            />
            <Button type="submit">Добавить задачу</Button>
          </form>
        </CardBody>
      </Card>
      <div className="space-y-4 mt-4">
        {processTodos.length > 0 && "В процессе:"}
        {processTodos.map((todo) => (
          <Todo
            id={todo.id}
            key={todo.id}
            name={todo.name}
            status={todo.status}
            onComplete={() => dispatch(completeTodo({ id: todo.id }))}
            onReturn={() => dispatch(returnTodo({ id: todo.id }))}
            onRemove={() => dispatch(removeTodo({ id: todo.id }))}
          />
        ))}
      </div>
      <div className="space-y-4 mt-4">
        {completedTodos.length > 0 && "Выполненые:"}
        {completedTodos.map((todo) => (
          <Todo
            id={todo.id}
            key={todo.id}
            name={todo.name}
            status={todo.status}
            onComplete={() => dispatch(completeTodo({ id: todo.id }))}
            onReturn={() => dispatch(returnTodo({ id: todo.id }))}
            onRemove={() => dispatch(removeTodo({ id: todo.id }))}
          />
        ))}
      </div>
      <div className="space-y-4 mt-4">
        {removedTodos.length > 0 && "Удалены:"}
        {removedTodos.map((todo) => (
          <Todo
            id={todo.id}
            key={todo.id}
            name={todo.name}
            status={todo.status}
            onComplete={() => dispatch(completeTodo({ id: todo.id }))}
            onReturn={() => dispatch(returnTodo({ id: todo.id }))}
            onRemove={() => dispatch(removeTodo({ id: todo.id }))}
          />
        ))}
      </div>
    </div>
  );
}

interface TodoProps {
  name: string;
  status: TodoStatus;
  id: string;
  onComplete: () => void;
  onRemove: () => void;
  onReturn: () => void;
}

function Todo({ name, id, status, onComplete, onRemove, onReturn }: TodoProps) {
  return (
    <motion.div initial={{ translateY: 60 }} animate={{ translateY: 0 }}>
      <Card className={status === "removed" ? "line-through" : ""}>
        <CardHeader className="flex gap-3">
          <p className="text-lg font-medium">{name}</p>
        </CardHeader>
        <Divider />
        <CardFooter className="flex justify-between text-primary gap-2">
          <div className="">
            <p className="text-xs font-thin">id: {id}</p>
          </div>
          <div className="space-x-2">
            {status === "completed" || status === "removed" ? (
              <ReturnButton onCLick={onReturn} />
            ) : (
              ""
            )}
            <RemoveButton onRemove={onRemove} />
            {status !== "completed" ? (
              <CompleteButton onCLick={onComplete} />
            ) : (
              ""
            )}
          </div>
        </CardFooter>
        <div
          className={`absolute bg-black size-full pointer-events-none opacity-${
            status === "removed" ? "50" : "0"
          }`}
        ></div>
      </Card>
    </motion.div>
  );
}

interface AddButtonProps {
  onAdd: () => void;
}

function AddButton({ onAdd }: AddButtonProps) {
  return <Button onClick={onAdd}>add</Button>;
}

interface RemoveButtonProps {
  onRemove: () => void;
}

function RemoveButton({ onRemove, ...props }: RemoveButtonProps) {
  return (
    <Button
      isIconOnly
      onClick={onRemove}
      color="danger"
      className="p-2"
      {...props}
    >
      <CiTrash className="size-full" />
    </Button>
  );
}

interface completeButtonProps {
  onCLick: () => void;
}

function CompleteButton({ onCLick }: completeButtonProps) {
  return (
    <Button isIconOnly onClick={onCLick} color="success" className="p-2">
      <IoMdCheckmark className="size-full text-white" />
    </Button>
  );
}

interface ReturnButtonProps {
  onCLick: () => void;
}

function ReturnButton({ onCLick }: ReturnButtonProps) {
  return (
    <Button isIconOnly onClick={onCLick} color="default" className="p-2">
      <TiArrowBack className="size-full text-white" />
    </Button>
  );
}
