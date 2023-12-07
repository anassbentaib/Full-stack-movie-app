import React from "react";

const Button = ({ isLoading, action, type }) => {
  return (
    <button
      type={type}
      disabled={isLoading}
      p="1rem 7rem"
      bg="#6f4d98"
      _hover={{ bg: "#6f4d98" }}
      color="#fff"
    >
      {action}
    </button>
  );
};

export default Button;
