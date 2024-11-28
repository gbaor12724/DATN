import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Product from "./product";
import AddProduct from "./AddProduct";
import ThuongHieuManager from "./ThuongHieuManager";
import NguoiDung from "./NguoiDung";
// import Cate from "./cate";


export default function LayoutADMIN() {
  const styles = {
    container: {
      display: "flex",
      minHeight: "100vh",
      backgroundColor: "#ecf0f1",
    },
    sidebar: {
      width: "250px",
      backgroundColor: "#34495e",
      color: "#ecf0f1",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    sidebarItem: {
      margin: "15px 0",
      color: "#ecf0f1",
      textDecoration: "none",
      fontSize: "18px",
      display: "block",
      transition: "color 0.3s",
    },
    sidebarItemHover: {
      color: "#1abc9c",
    },
    mainContent: {
      flex: 1,
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#2c3e50",
      padding: "10px 20px",
      color: "#ecf0f1",
      fontFamily: "Arial, sans-serif",
      position: "sticky",
      top: 0,
      zIndex: 1000,
    },
    logo: {
      fontSize: "24px",
      fontWeight: "bold",
    },
    nav: {
      display: "flex",
      gap: "15px",
    },
    navItem: {
      color: "#ecf0f1",
      textDecoration: "none",
      fontSize: "16px",
      transition: "color 0.3s",
    },
    navItemHover: {
      color: "#1abc9c",
    },
    button: {
      padding: "5px 10px",
      backgroundColor: "#e74c3c",
      color: "#ecf0f1",
      border: "none",
      borderRadius: "3px",
      cursor: "pointer",
      fontSize: "14px",
      transition: "background-color 0.3s",
    },
    buttonHover: {
      backgroundColor: "#c0392b",
    },
  };

  const location = useLocation();

  // Xử lý nội dung dựa trên path
  const renderContent = () => {
    switch (location.pathname) {
      case "/dashboard":
        return <h2>Dashboard - Thống kê</h2>;
      case "/product":
        return <Product />;
      case "/product/add":
        return <AddProduct />;
      case "/thuonghieu":
        return <ThuongHieuManager />;
        case "/nguoi-dung":
          return <NguoiDung />;
        // case "/nguoi-dung/add":
        //   return <AddNguoiDung />;
        // case "/nguoi-dung/edit/:id":
        //   return <EditNguoiDung />;
      default:
        return <h2>Dashboard - Thống kê</h2>;
    }
};


  return (
    <div style={styles.container}>
      {/* Sidebar Left */}
      <aside style={styles.sidebar}>
      <a
    href="/nguoi-dung"
    style={styles.sidebarItem}
    onMouseOver={(e) =>
      (e.target.style.color = styles.sidebarItemHover.color)
    }
    onMouseOut={(e) =>
      (e.target.style.color = styles.sidebarItem.color)
    }
  >
    Danh sách người dùng
  </a>
  {/* <a
    href="/nguoi-dung/add"
    style={styles.sidebarItem}
    onMouseOver={(e) =>
      (e.target.style.color = styles.sidebarItemHover.color)
    }
    onMouseOut={(e) =>
      (e.target.style.color = styles.sidebarItem.color)
    }
  >
    Thêm người dùng
  </a> */}
        
        <a
          href="/product"
          style={styles.sidebarItem}
          onMouseOver={(e) =>
            (e.target.style.color = styles.sidebarItemHover.color)
          }
          onMouseOut={(e) =>
            (e.target.style.color = styles.sidebarItem.color)
          }
        >
          Danh sách sản phẩm
        </a>
        
        <a
         href="/thuonghieu"
        style={styles.sidebarItem}
        onMouseOver={(e) =>
           (e.target.style.color = styles.sidebarItemHover.color)
          }
          onMouseOut={(e) =>
            (e.target.style.color = styles.sidebarItem.color)
          }
        >
          Danh sách thương hiệu
        </a>
      </aside>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.logo}>Admin Dashboard</div>
          <nav style={styles.nav}>
            <a
              href="/dashboard"
              style={styles.navItem}
              onMouseOver={(e) =>
                (e.target.style.color = styles.navItemHover.color)
              }
              onMouseOut={(e) =>
                (e.target.style.color = styles.navItem.color)
              }
            >
              Dashboard
            </a>
            <a
              href="/users"
              style={styles.navItem}
              onMouseOver={(e) =>
                (e.target.style.color = styles.navItemHover.color)
              }
              onMouseOut={(e) =>
                (e.target.style.color = styles.navItem.color)
              }
            >
              Users
            </a>
            <a
  href="/thuonghieu"
  style={styles.navItem}
  onMouseOver={(e) =>
    (e.target.style.color = styles.navItemHover.color)
  }
  onMouseOut={(e) =>
    (e.target.style.color = styles.navItem.color)
  }
>
  Thương hiệu
</a>
            <a
              href="/thuonghieu/add"
              style={styles.navItem}
              onMouseOver={(e) =>
                (e.target.style.color = styles.navItemHover.color)
              }
              onMouseOut={(e) =>
                (e.target.style.color = styles.navItem.color)
              }
            >
              them thuong hieu
            </a>
            <a
              href="/thuonghieu/edit/:id"
              style={styles.navItem}
              onMouseOver={(e) =>
                (e.target.style.color = styles.navItemHover.color)
              }
              onMouseOut={(e) =>
                (e.target.style.color = styles.navItem.color)
              }
            >
              sua thuong hieu 
            </a>
            <a
              href="/settings"
              style={styles.navItem}
              onMouseOver={(e) =>
                (e.target.style.color = styles.navItemHover.color)
              }
              onMouseOut={(e) =>
                (e.target.style.color = styles.navItem.color)
              }
            >
              Settings
            </a>
            <a
    href="/nguoi-dung"
    style={styles.navItem}
    onMouseOver={(e) =>
      (e.target.style.color = styles.navItemHover.color)
    }
    onMouseOut={(e) =>
      (e.target.style.color = styles.navItem.color)
    }
  >
    Users
  </a>
  <a
    href="/nguoi-dung/add"
    style={styles.navItem}
    onMouseOver={(e) =>
      (e.target.style.color = styles.navItemHover.color)
    }
    onMouseOut={(e) =>
      (e.target.style.color = styles.navItem.color)
    }
  >
    Add User
  </a>
          </nav>
          <button
            style={styles.button}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor =
                styles.buttonHover.backgroundColor)
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor = styles.button.backgroundColor)
            }
            onClick={() => alert("Logging out...")}
          >
            Logout
          </button>
        </header>

        {/* Content Placeholder */}
        <main style={{ padding: "20px" }}>{renderContent()}</main>
      </div>
    </div>
  );
}
