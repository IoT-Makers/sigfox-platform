const Overview = {
    text: 'Overview',
    link: '/overview',
    icon: 'icon-home'
};

const headingDashboards = {
    text: 'Dashboards',
    heading: true,
};

const AddDashboard = {
    text: "Add dashboard",
    link: "/dashboard",
    icon: "icon-plus text-success"
};

const headingInformation = {
    text: 'Information',
    heading: true
};

const Categories = {
    text: "Categories",
    link: "/categories",
    icon: "icon-tag",
    alert: "0",
    label: "badge badge-category text-white"
    /*submenu: [
        {
            text: "Cards",
            link: "/material/cards"
        },
        {
            text: "Forms",
            link: "/material/forms"
        },
        {
            text: "Inputs",
            link: "/material/inputs"
        },
        {
            text: "Lists",
            link: "/material/lists"
        },
        {
            text: "Whiteframe",
            link: "/material/whiteframe"
        },
        {
            text: "Colors",
            link: "/material/colors"
        },
        {
            text: "ng2Material",
            link: "/material/ngmaterial"
        }
    ],
    "alert": "new",
    "label": "badge badge-primary"*/
};

const Devices = {
    text: "Devices",
    link: "/devices",
    icon: "icon-cloud-upload",
    alert: "0",
    label: "badge badge-device text-white"
};

const Messages = {
    text: "Messages",
    link: "/messages",
    icon: "icon-envelope",
    alert: "0",
    label: "badge badge-message text-white"
};

const Alerts = {
    text: "Alerts",
    link: "/alerts",
    icon: "icon-bell",
    alert: "0",
    label: "badge badge-alert text-white"
};

export const menuOrganization = [
    Overview,
    headingDashboards,
    AddDashboard,
    headingInformation,
    Categories,
    Devices,
    Messages,
    Alerts
];
