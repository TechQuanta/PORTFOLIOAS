// components/ThemeWrapper.jsx
import { useTheme } from "./ThemeContext";
import PropTypes from "prop-types";

const ThemeWrapper = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div className={`${theme} transition-colors duration-500 ease-in-out`}>
      {children}
    </div>
  );
};

ThemeWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeWrapper;
