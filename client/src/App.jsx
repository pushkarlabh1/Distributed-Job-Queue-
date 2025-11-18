import { Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { Navbar, Sidebar } from "./components";
import { Dashboard, Login, TaskDetail, Tasks, Trash, Users } from "./pages";
import JobQueueXNavBar from "./components/JobQueueXNavBar";
import JobQueueXHome from "./pages/JobQueueXHome";
import { setOpenSidebar } from "./redux/slices/authSlice";

function Layout() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  return user ? (
    <div className='w-full h-screen flex flex-col md:flex-row'>
      <div className='w-1/5 h-screen bg-white dark:bg-[#1f1f1f] sticky top-0 hidden md:block'>
        <Sidebar />
      </div>

      <MobileSidebar />

      <div className='flex-1 overflow-y-auto'>
        <Navbar />

        <div className='p-4 2xl:px-10'>
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to='/log-in' state={{ from: location }} replace />
  );
}

const MobileSidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.auth);
  const mobileMenuRef = useRef(null);
  const dispatch = useDispatch();

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  return (
    <>
      <Transition
        show={isSidebarOpen}
        as={Fragment}
        enter='transition-opacity duration-700'
        enterFrom='opacity-x-10'
        enterTo='opacity-x-100'
        leave='transition-opacity duration-700'
        leaveFrom='opacity-x-100'
        leaveTo='opacity-x-0'
      >
        {(ref) => (
          <div
            ref={(node) => (mobileMenuRef.current = node)}
            className={`md:hidden w-full h-full bg-black/40 transition-transform duration-700 transform
             ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
            onClick={() => closeSidebar()}
          >
            <div className='bg-white w-3/4 h-full'>
              <div className='w-full flex justify-end px-5 pt-5'>
                <button
                  onClick={() => closeSidebar()}
                  className='flex justify-end items-end'
                >
                  <IoMdClose size={25} />
                </button>
              </div>

              <div className='-mt-10'>
                <Sidebar />
              </div>
            </div>
          </div>
        )}
      </Transition>
    </>
  );
};

const App = () => {
  const theme = "light";
  const { user } = useSelector((state) => state.auth);

  return (
    <main className={theme}>
      <div className='w-full min-h-screen bg-[#f3f4f6] dark:bg-[#0d0d0df4]'>
        <Routes>
          {/* Public routes - accessible to all users */}
          <Route path="/" element={
            <>
              <JobQueueXNavBar />
              <JobQueueXHome />
            </>
          } />
          <Route path="/signin" element={
            <Navigate to="/log-in" />
          } />
          <Route path="/register" element={
            <Navigate to="/log-in" />
          } />
          <Route path="/register/enterprise" element={
            <Navigate to="/log-in" />
          } />
          <Route path="/register/employee" element={
            <Navigate to="/log-in" />
          } />
          <Route path="/features" element={
            <>
              <JobQueueXNavBar />
              <JobQueueXHome />
            </>
          } />
          <Route path="/jdashboard" element={
            <Navigate to="/dashboard" />
          } />
          <Route path="/docs" element={
            <>
              <JobQueueXNavBar />
              <JobQueueXHome />
            </>
          } />
          <Route path="/log-in" element={
            <Login />
          } />

          {/* Authenticated routes - only accessible when logged in */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/completed/:status?" element={<Tasks />} />
            <Route path="/in-progress/:status?" element={<Tasks />} />
            <Route path="/todo/:status?" element={<Tasks />} />
            <Route path="/trashed" element={<Trash />} />
            <Route path="/task/:id" element={<TaskDetail />} />
            <Route path="/team" element={<Users />} />
          </Route>
        </Routes>
      </div>

      <Toaster richColors position='top-center' />
    </main>
  );
};

export default App;
