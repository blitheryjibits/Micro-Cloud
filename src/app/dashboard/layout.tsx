export default function DashboardLayout({
  children,
  modal,
}: {
  children?: React.ReactNode;
  modal?: React.ReactNode;
}) {
  return (
    <>
      <main>{children}</main>
      {modal}
    </>
  );
}
