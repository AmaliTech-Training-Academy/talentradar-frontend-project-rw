import { ModeToggle } from "@/components/custom/mode-toggle";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className=" w-full h-full mt-20 ">
      <div className="mx-auto w-fit space-y-10">
        <div className="w-fit mx-auto">
          <ModeToggle />
        </div>
        <p className="font-bold text-2xl text-center">TalentRadar!</p>
        <p className="mx-auto w-fit">Welcome</p>
        <Button className="flex mx-auto">Get started</Button>
      </div>
    </div>
  );
};

export default Home;
