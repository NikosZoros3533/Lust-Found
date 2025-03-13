const ConnectionItem = ({
  post: {
    title,
    encounterDescription,
    gender,
    targetGender,
    interests,
    comments,
  },
}) => {
  return (
    <div className="max-w-full sm:max-w-xl mx-auto p-4 rounded-2xl">
      <h2 className="text-xl sm:text-2xl font-bold text-dark">{title}</h2>
      <p className="text-dark mt-2 text-base sm:text-lg">
        {encounterDescription}
      </p>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-light3">
        <p>
          <span className="font-semibold">Gender:</span> {gender || null}
        </p>
        <p>
          <span className="font-semibold">Target Gender:</span>{" "}
          {targetGender || null}
        </p>
      </div>
      <div className="mt-4 flex justify-between items-center text-sm text-light3">
        <div className="flex items-center space-x-2">
          <span className="text-dark">❤️ {interests.length}</span>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center text-sm text-light2 border-t pt-2">
        <div className="flex items-center space-x-2">
          <span className="text-light2"> {comments[0]?.user}</span>
        </div>
        {comments[0]?.text}
      </div>
    </div>
  );
};

export default ConnectionItem;
