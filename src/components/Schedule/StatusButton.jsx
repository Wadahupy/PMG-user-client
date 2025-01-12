const StatusButton = ({
  label,
  field,
  value,
  activeTab,
  onClick,
  allAppointments,
}) => {
  const isActive = activeTab === label;
  const count = allAppointments.filter(
    (appointment) => appointment[field] === value
  ).length;

  return (
    <button
      className={`py-2 px-4 h-full flex items-center justify-center gap-2 rounded-xl text-base duration-300 ease-in-out ${
        isActive
          ? "cursor-default text-white bg-primary"
          : "bg-primary/10 text-black hover:bg-blue-gray-50"
      }`}
      onClick={() => onClick(field, value, label)}
      disabled={isActive} // Disable button if it's the active tab
    >
      <p>{label}</p>
      <span className="flex items-center justify-center text-sm text-black rounded-full bg-secondary size-8">
        {count}
      </span>
    </button>
  );
};

export default StatusButton;
