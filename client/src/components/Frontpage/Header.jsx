// client/src/components/Frontpage/Header.jsx
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  User,
  ChevronDown,
  ChevronRight,
  LogOut,
  LayoutDashboard,
  Shield,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const AccountSection = () => {
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const accountDropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        accountDropdownRef.current &&
        !accountDropdownRef.current.contains(e.target)
      ) {
        setIsAccountDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsAccountDropdownOpen(false);
    navigate("/");
  };

  if (!user) {
    return (
      <motion.button
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        className="relative flex items-center gap-3 px-5 py-2.5 rounded-xl bg-black border border-white/20 hover:border-white/40 shadow-lg transition-all duration-300 group overflow-hidden"
        onClick={() => navigate("/auth")}
      >
        <motion.div
          className="absolute inset-0 bg-white/5"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="relative w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)] overflow-hidden z-10"
          whileHover={{
            scale: 1.15,
            boxShadow: "0 0 20px rgba(255,255,255,0.2)",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <User className="w-5 h-5 text-white" />
        </motion.div>
        <span className="font-medium text-white group-hover:text-white transition-colors text-sm z-10">
          Account
        </span>
        <motion.div
          animate={{ rotate: 0, y: 0 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
          className="z-10"
        >
          <ChevronDown className="w-4 h-4 text-white/70 group-hover:text-white" />
        </motion.div>
      </motion.button>
    );
  }

  const accountDisplay = user.name || "Account";
  const userEmail = user.email || "";

  return (
    <div
      className="relative ml-4"
      ref={accountDropdownRef}
      onMouseEnter={() => setIsAccountDropdownOpen(true)}
      onMouseLeave={() => setIsAccountDropdownOpen(false)}
    >
      <motion.button
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        className="relative flex items-center gap-3 px-5 py-2.5 rounded-xl bg-black border border-white/20 hover:border-white/40 shadow-lg transition-all duration-300 group overflow-hidden"
        aria-expanded={isAccountDropdownOpen}
        aria-haspopup="true"
      >
        <motion.div
          className="absolute inset-0 bg-white/5"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="relative w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)] overflow-hidden z-10"
          whileHover={{
            scale: 1.15,
            boxShadow: "0 0 20px rgba(255,255,255,0.2)",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <User className="w-5 h-5 text-white" />
          <motion.div
            className="absolute inset-0 bg-white/10 rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
        </motion.div>
        <span className="font-medium text-white group-hover:text-white transition-colors text-sm z-10">
          {accountDisplay}
        </span>
        <motion.div
          animate={{
            rotate: isAccountDropdownOpen ? 180 : 0,
            y: isAccountDropdownOpen ? 2 : 0,
          }}
          transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
          className="z-10"
        >
          <ChevronDown className="w-4 h-4 modular text-white/70 group-hover:text-white" />
        </motion.div>
        {user && (
          <motion.span
            className="absolute top-0 right-0 w-3 h-3 bg-green-300 rounded-full border-2 border-black/80"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.7, 1],
              boxShadow: [
                "0 0 0px rgba(255, 255, 255, 0.2)",
                "0 0 10px rgba(255,255,255,0.4)",
                "0 0 0px rgba(255, 255, 255, 0.2)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "loop" }}
          />
        )}
      </motion.button>

      <AnimatePresence>
        {isAccountDropdownOpen && (
          <motion.div
            className="absolute right-0 mt-3 w-72 rounded-xl bg-black backdrop-blur-lg border border-white/20 shadow-[0_10px_40px_-5px_rgba(0,0,0,0.5)] overflow-hidden z-50"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { opacity: 0, y: -5, scale: 0.95 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { staggerChildren: 0.08 },
              },
            }}
          >
            <motion.div
              className="p-5 border-b border-white/10 bg-white/5"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            >
              <div className="flex items-center gap-4">
                <motion.div
                  className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center shadow-lg overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                >
                  <User className="w-8 h-8 text-white" />
                  <motion.div
                    className="absolute inset-0 bg-white/10"
                    animate={{ scale: [1, 1.2, 1], opacity: [0, 0.2, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                  />
                </motion.div>
                <div>
                  <motion.p
                    className="font-semibold text-white text-lg"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {accountDisplay}
                  </motion.p>
                  <motion.p
                    className="text-xs text-white/60 mt-0.5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {userEmail}
                  </motion.p>
                  <motion.p
                    className="text-xs text-white/60 mt-0.5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </motion.p>
                  <motion.div
                    className="mt-2 flex items-center gap-1 bg-white/10 text-white/80 text-xs py-1 px-2 rounded-full w-fit"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <Shield size={10} />
                    <span>Verified Account</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <div className="py-2">
              <motion.div
                className="relative"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <Link
                  to="/profile"
                  onClick={() => setIsAccountDropdownOpen(false)}
                  className="flex items-center gap-3 px-5 py-3.5 text-sm text-white hover:bg-white/5 transition-colors group relative overflow-hidden"
                >
                  <motion.div
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors"
                    whileHover={{ scale: 1.1 }}
                  >
                    <User className="w-5 h-5 text-white/80 group-hover:text-white" />
                  </motion.div>
                  <div className="flex flex-col">
                    <span className="font-medium group-hover:text-white transition-colors">
                      Profile
                    </span>
                    <span className="text-xs text-white/50 mt-0.5">
                      View and edit your profile
                    </span>
                  </div>
                  <motion.div
                    className="absolute inset-0 bg-white/5 rounded-full pointer-events-none"
                    initial="initial"
                    whileHover="animate"
                    variants={{
                      initial: { scale: 0 },
                      animate: {
                        scale: 1.5,
                        opacity: 0,
                        transition: { duration: 0.7 },
                      },
                    }}
                  />
                </Link>
              </motion.div>

              <motion.div
                className="relative"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <Link
                  to="/dashboard"
                  onClick={() => setIsAccountDropdownOpen(false)}
                  className="flex items-center gap-3 px-5 py-3.5 text-sm text-white hover:bg-white/5 transition-colors group relative overflow-hidden"
                >
                  <motion.div
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors"
                    whileHover={{ scale: 1.1 }}
                  >
                    <LayoutDashboard className="w-5 h-5 text-white/80 group-hover:text-white" />
                  </motion.div>
                  <div className="flex flex-col">
                    <span className="font-medium group-hover:text-white transition-colors">
                      Dashboard
                    </span>
                    <span className="text-xs text-white/50 mt-0.5">
                      View your courses
                    </span>
                  </div>
                  <motion.div
                    className="absolute inset-0 bg-white/5 rounded-full pointer-events-none"
                    initial="initial"
                    whileHover="animate"
                    variants={{
                      initial: { scale: 0 },
                      animate: {
                        scale: 1.5,
                        opacity: 0,
                        transition: { duration: 0.7 },
                      },
                    }}
                  />
                </Link>
              </motion.div>

              <motion.div
                className="px-4 py-3 mt-1"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <motion.button
                  onClick={handleLogout}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-3 px-5 py-3 text-sm text-white/90 hover:bg-white/10 transition-colors rounded-lg border border-white/10 bg-white/5 group"
                >
                  <motion.div
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors"
                    whileHover={{ rotate: 10 }}
                  >
                    <LogOut className="w-5 h-5 text-white/80 group-hover:text-white" />
                  </motion.div>
                  <div className="flex flex-col items-start">
                    <span className="font-medium">Logout</span>
                    <span className="text-xs text-white/50 mt-0.5">
                      End your session
                    </span>
                  </div>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MobileAccountSection = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const accountDisplay = user.name || "Account";
  const userEmail = user.email || "";

  const handleLogout = async () => {
    await logout();
    setIsDropdownOpen(false);
    navigate("/");
  };

  return (
    <div className="mb-4">
      <div
        className="p-5 bg-black/80 rounded-lg shadow-lg flex items-center gap-4 cursor-pointer"
        onClick={() => setIsDropdownOpen((p) => !p)}
      >
        <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center shadow-lg">
          <User className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-white text-lg">{accountDisplay}</p>
          <p className="text-xs text-white/60">{userEmail}</p>
          <p className="text-xs text-white/60">
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </p>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-white transition-transform ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
        />
      </div>
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 bg-black/80 rounded-lg overflow-hidden"
          >
            <Link to="/profile" onClick={() => setIsDropdownOpen(false)}>
              <div className="px-5 py-3 text-white hover:bg-gray-800">
                Profile
              </div>
            </Link>
            <Link to="/dashboard" onClick={() => setIsDropdownOpen(false)}>
              <div className="px-5 py-3 text-white hover:bg-gray-800">
                Dashboard
              </div>
            </Link>
            <div
              className="px-5 py-3 text-white hover:bg-gray-800 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Header = ({ setCursorVariant }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const location = useLocation();
  const pathname = location.pathname;
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = document.querySelectorAll("section[id]");
      const scrollPos = window.pageYOffset + 100;
      sections.forEach((sec) => {
        const top = sec.offsetTop;
        if (scrollPos >= top && scrollPos < top + sec.offsetHeight) {
          setActiveSection(sec.getAttribute("id"));
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", link: "/", dropdown: null },
    { name: "Courses", link: "/courses", dropdown: null },
    { name: "Teacher", link: "/teachers", dropdown: null },
    { name: "About Us", link: "/aboutus", dropdown: null }, // Updated to "/aboutus"
    { name: "Contact Us", link: "/contactus", dropdown: null },
  ];

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 py-3 ${
          scrolled
            ? "bg-gradient-to-r from-black/95 to-black/85 shadow-lg backdrop-blur-sm"
            : "bg-gradient-to-r from-black/70 to-black/60 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/">
              <div className="h-12 w-auto bg-white rounded-md py-2 flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300">
                <img src="/T5-Logo.png" alt="T5" className="h-13 w-auto" />
              </div>
            </Link>
          </motion.div>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item, idx) => {
              const isActive =
                (item.link === "/" &&
                  pathname === "/" &&
                  activeSection === "hero") ||
                (item.link === "/courses" && pathname.includes("/courses")) ||
                (item.link === "/teachers" && pathname.includes("/teachers")) ||
                (item.link === "/aboutus" && pathname === "/aboutus") || // Added condition for About Us
                (item.link === "/contactus" && pathname === "/contactus");
              return (
                <Link key={idx} to={item.link}>
                  <div
                    className={`px-4 py-2 mx-1 rounded-md transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-white text-black"
                        : "text-white hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <span className="relative">
                      {item.name}
                      {isActive && (
                        <motion.span
                          className="absolute -bottom-1 left-0 w-full h-0.5 bg-white"
                          layoutId="underline"
                        />
                      )}
                    </span>
                  </div>
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <AccountSection />
          </div>

          <div className="md:hidden flex items-center">
            <button
              className="text-white p-2 rounded-md focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[60px] inset-x-0 z-40 bg-black/95 overflow-y-auto md:hidden max-h-[calc(100vh-60px)]"
          >
            <div className="px-4 py-8 space-y-4">
              {user ? (
                <MobileAccountSection />
              ) : (
                <button
                  className="w-full py-3 px-4 bg-black text-white border border-white rounded-md font-medium flex items-center justify-center gap-2 hover:bg-gray-800"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/auth");
                  }}
                >
                  <User className="h-4 w-4" /> Account
                </button>
              )}

              {navItems.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.link}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-white font-medium py-1 cursor-pointer"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
