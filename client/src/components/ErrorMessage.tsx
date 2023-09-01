export default function ErrorMessage({ message }: { message: string | undefined }) {
  return <p className="p-2 rounded-md bg-rose-200 text-rose-500">{message}</p>;
}
