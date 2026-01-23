type TableProps = {
  children: React.ReactNode;
  className?: string;
};

const Table = ({ children, className }: TableProps) => {
  const baseStyle = `mt-6 2xl:mt-10 border border-[#A9A9A9] overflow-auto rounded-2xl ${className}`
  return (
    <div className={baseStyle}>
      <table className="table-auto w-full text-[#1D2433] text-base 2xl:text-xl">
        {children}
      </table>
    </div>
  );
};

Table.Heading = ({ children }: { children: React.ReactNode }) => {
  return (
    <thead>
      <tr>{children}</tr>
    </thead>
  );
};

Table.HeadingItem = ({ children, className}: { children: React.ReactNode, className?: string; }) => {
  const baseStyle = `px-4 md:px-8 py-6 bg-[#F1F3F9] font-semibold text-left ${className}`
  return (
    <th className={baseStyle}>
      {children}
    </th>
  );
};


Table.Body = ({ children }: { children: React.ReactNode }) => {
  return <tbody>{children}</tbody>;
};

Table.Row = ({ children }: { children: React.ReactNode }) => {
  return <tr>{children}</tr>;
};

Table.Cell = ({
  children,
  rowIndex,
  className
}: {
  children: React.ReactNode;
  rowIndex: number;
  className?: string;
}) => {
  const baseStyle = `
    ${rowIndex % 2 === 0 ? "bg-white" : "bg-[#F8F9FC]"}
    px-4 md:px-8 py-6 md:py-4 text-left ${className}
  `
  return (
    <td
      className={baseStyle}
    >
      {children}
    </td>
  );
};


export default Table;
