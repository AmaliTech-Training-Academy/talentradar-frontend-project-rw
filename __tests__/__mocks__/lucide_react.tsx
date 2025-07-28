import React from "react";

const createIcon = (name: string) =>
  React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
    (props, ref) => <svg ref={ref} {...props} data-testid={`${name}-icon`} />
  );

export const Mail = createIcon("Mail");
export const Lock = createIcon("Lock");
export const LogIn = createIcon("LogIn");
export const Loader = createIcon("Loader");
export const User = createIcon("User");
export const MoveRight = createIcon("MoveRight");
export const Users = createIcon("Users");
export const Info = createIcon("Info");

