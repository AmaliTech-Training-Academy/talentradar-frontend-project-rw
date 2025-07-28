// __mocks__/skillConfigMock.ts
import { LucideProps } from "lucide-react";
import { forwardRef } from "react";

export const MockIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => (
  <svg data-testid="mock-icon" ref={ref} {...props} />
));

export const skillConfig = {
  communicationcollaboration: {
    label: "Communication & Collaboration",
    color: "bg-sky-500",
    Icon: MockIcon,
  },
  executionresults: {
    label: "Execution & Results",
    color: "bg-green-500",
    Icon: MockIcon,
  },
};

export const configColors = [
  { color: "bg-sky-500", icon: MockIcon },
  { color: "bg-green-500", icon: MockIcon },
];
