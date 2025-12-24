const [user, setUser] = useState({ name: "User", role: "user" });

export const getUser = () => {
  return user;
};

export const onChangeUser = (newUser) => {
  setUser(newUser);
}