This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Dependencies and installation

nextjs.org recoments using pnpm as your package manager, as it's faster and more efficient than npm or yarn. <https://nextjs.org/learn/dashboard-app/getting-started>

```bash title=">_Terminal"
npm install -g pnpm 
pnpm install
```

## Getting Started

First, run the development server (use the prefered method from pnpm):

```bash
npm run dev
# or
yarn dev
# or
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

# Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

# Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Connect to the cat

The rosbridge is needed to connect ros messages to the websocke over the port 9090:

```bash
bros2 launch rosbridge_server rosbridge_websocket_launch.xm
```

Start mavros to connect the mavlink messages from ardurover:

```bash
ros2 launch mavros cleaningcat_local.launch
```

Take into account, that ardurover should be pointing to the IP of the pc runing the mavros launch file:

```bash title="/etc/default/ardurover"
# Dell laptop
TELEM1="-A udp:192.168.1.164:14650"
```

and the lauch file is configure to recieved and forward in case we only want to use qgroundcontrol:
```yaml title="/opt/ros/humble/share/mavros/launch/cleaningcat_local.launch"
        <arg name="fcu_url" default="udp://:14650@" />
        <arg name="gcs_url" default="udp://:14551@localhost:14550" />
```

# RC override troubles

In order the be able to over ride ```cleaningcat\_local.launch``` needs system\_id 255 and component\_id 240. Also the variables system\_id and component\_id need to be set in the node.launch file. See the documents as reference unter <https://github.com/axonbf/cat_steering/blob/master/external_config_files/>

