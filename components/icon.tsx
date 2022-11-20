import { ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "next-themes";

type iconProps = {
  role: string;
};
export default function ThemeIcon({ role }: iconProps): ReactElement {
  const { theme, setTheme } = useTheme();
  return (
    <div className="g-3">
      {theme === "light" ? (
        <FontAwesomeIcon
          icon="moon"
          role={role}
          style={{
            width: '30px',
            height: '30px',
            marginTop: '8px'
          }}
          onClick={() => setTheme("dark")}
        />
      ) : (
        <FontAwesomeIcon
          icon="sun"
          role={role}
          style={{
            width: '30px',
            height: '30px',
            marginTop: '8px'
          }}
          onClick={() => setTheme("light")}
        />
      )}
    </div>
  );
}
