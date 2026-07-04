type TableProps = {
  children: React.ReactNode;
  className?: string;
  tableClass?: string;
  isLoading?: boolean;
};

const Table = ({ children, className, tableClass, isLoading }: TableProps) => {
  const baseStyle = `primary-scrollbar mt-6 3xl:mt-10 border border-[#A9A9A9] overflow-auto rounded-2xl ${className}
    ${isLoading ? "opacity-70 select-none" : "opacity-100"}
  `;
  const tableStyle = `table-auto w-full text-[#1D2433] text-base 3xl:text-xl ${tableClass}`;
  return (
    <div className={baseStyle}>
      <table className={tableStyle}>
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

Table.HeadingItem = ({ 
  children, 
  className, 
  handleClick 
}: { 
  children: React.ReactNode, 
  className?: string; 
  handleClick?: (event?: unknown) => void;
}) => {
  const baseStyle = `px-4 md:px-8 py-6 bg-[#F1F3F9] font-semibold text-start ${className}`
  return (
    <th className={baseStyle} onClick={handleClick}>
      {children}
    </th>
  );
};


Table.Body = ({ children }: { children: React.ReactNode }) => {
  return <tbody>{children}</tbody>;
};

Table.Row = ({ children }: { children: React.ReactNode }) => {
  return <tr className="group">{children}</tr>;
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
    px-4 md:px-8 py-4 text-start leading-[36px] align-top text-base transition-all duration-300 ease-out ${className}
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
