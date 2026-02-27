"use client";

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem
} from "@heroui/navbar";
import {Link} from "@heroui/link";
import UsersTable from "@/components/table/usertable";
import CenteredList from "@/components/list/CenteredList";

export const AcmeLogo = () => {
    return (
        <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
            <path
                clipRule="evenodd"
                d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                fill="currentColor"
                fillRule="evenodd"
            />
        </svg>
    );
};

export default function Home() {
  return (
      <div>
      <Navbar>
          <NavbarBrand>
              <AcmeLogo />
              <p className="font-bold text-inherit">VAR Analytics</p>
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
              <NavbarItem>
                  <Link color="foreground" href="#">
                      Home
                  </Link>
              </NavbarItem>
              <NavbarItem isActive>
                  <Link aria-current="page" href="#">
                      Real Madrid
                  </Link>
              </NavbarItem>
              <NavbarItem>
                  <Link color="foreground" href="#">
                      FC Barcelona
                  </Link>
              </NavbarItem>
              <NavbarItem>
                  <Link color="foreground" href="#">
                      Arsenal
                  </Link>
              </NavbarItem>
              <NavbarItem>
                  <Link color="foreground" href="#">
                      Manchester City
                  </Link>
              </NavbarItem>
              <NavbarItem>
                  <Link color="foreground" href="#">
                      Submit Decision
                  </Link>
              </NavbarItem>
          </NavbarContent>
          <NavbarContent justify="end">
              {/*<NavbarItem className="hidden lg:flex">
                  <Link href="#">Login</Link>
              </NavbarItem>
              <NavbarItem>
                  <Button as={Link} color="primary" href="#" variant="flat">
                      Sign Up
                  </Button>
              </NavbarItem>*/}
          </NavbarContent>
      </Navbar>

          <CenteredList />
    {/*<UsersTable
        onView={(user) => console.log("view", user)}
        onEdit={(user) => console.log("edit", user)}
        onDelete={(user) => console.log("delete", user)}
    />*/}

          </div>
     )
}
