import Input from "@mui/joy/Input";
import { ChangeEventHandler, useEffect, useState } from "react";
import { useDebounce } from "./hooks/useDebounce";
import { getUsers, User } from "./services/users";

function App() {
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce(value, 1000);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const result = await getUsers(value);
      console.log(result);
      setUsers(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (debouncedValue) {
      fetchUsers();
    }
  }, [debouncedValue]);

  return (
    <main className="h-screen flex justify-center">
      <div className="mt-12">
        <h1 className="text-3xl">Debouncing with React 🔥</h1>
        <div className="max-w-md mt-6">
          <Input onChange={handleChange} color="info" />
          <div className="shadow-md p-4 mt-2">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              users.map((user) => <p className="mt-2">{user.name}</p>)
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
