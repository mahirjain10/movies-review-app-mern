const FormContainer = ({ className, displayForm,children,...rest }) => {
  return (
    <div className="flex justify-center items-center ">
      {console.log("display form : ",displayForm)}
      {displayForm ? (
        <form
          className={`bg-white drop-shadow flex flex-col items-center rounded dark:bg-secondary ${className}`}
          {...rest}
        >
          {children}
        </form>
      ) : (
        <div
          className={`bg-white drop-shadow flex flex-col items-center justify-center rounded dark:bg-secondary ${className}`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default FormContainer;
