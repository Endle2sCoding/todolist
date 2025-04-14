import { Todolists } from "@/widgets/Todolists";

interface MainPageProps {
  className?: string;
}

export const MainPage = ({ className }: MainPageProps) => {
  return (
    <div className={`${className ? className : ""}`}>
      <Todolists />
    </div>
  );
};
