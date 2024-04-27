import { H2oSense } from "./Charts/H2oSense";
import { TemperatureSense } from "./Charts/TemperatureSense";

export const Main = () => {
  return (
    <div className=" container mx-auto">
      <div className="grid grid-cols-2 gap-2 py-4 px-2">
        <div className=" p-2 bg-white rounded-lg">
          <H2oSense />
        </div>
        <div className="p-2 bg-white rounded-lg">
          <TemperatureSense />
        </div>
      </div>
    </div>
  );
};
