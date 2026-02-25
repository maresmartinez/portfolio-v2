import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Active Directory Domain Services Multi-Server Forest",
};

export default function ADDSForestPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/technical-writing"
        className="inline-flex items-center gap-1.5 text-sm text-indigo-600 hover:underline mb-8"
      >
        <ArrowLeft size={14} /> Technical Writing
      </Link>

      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <h2>Active Directory Domain Services Forest</h2>

        <h3>Introduction</h3>
        <p>
          This report is a step-by-step tutorial which explains how to set-up and
          configure an Active Directory forest with multiple servers on one
          domain. This forest will simulate the forest for a fictional company
          called Big Potato Inc., which is spread across three physical
          locations: Calgary, Minnesota, and London. The forest will be initially
          set up in Calgary on a Windows Server 2012 R2 Standard Core, and the
          other locations will configure domain controllers that will join that
          existing domain.
        </p>
        <p>
          We will be using a virtual environment running on VMware vSphere, a
          cloud computing virtualization platform. This virtual environment will
          simulate a network in three different locations. The steps in this
          report can be carried over to any physical networks which need to be
          connected to an Active Directory Domain.
        </p>
        <p>Here is a breakdown of the devices that are on this network:</p>
        <ul>
          <li>1 x Router running pfSense</li>
          <li>3 x Windows Server 2012 R2 Standard Core</li>
          <li>3 x Windows Server 2012 R2 Standard with GUI</li>
          <li>3 x Windows 8.1 Clients</li>
        </ul>

        <h4>Network Diagram</h4>
        <p>
          The following diagram describes the proposed environment for Big
          Potato&apos;s network:
        </p>
        <figure>
          <img
            src="/adds-forest/image001.png"
            className="w-full rounded-lg"
            alt="Network diagram for Big Potato Inc."
          />
        </figure>

        <h3>Forest Setup and Joining the Domain</h3>
        <p>
          This section will show the steps to implement the configuration,
          outlined in Part 1, for our new organization.
        </p>

        <h4>Setting Up the Root Domain</h4>
        <p>
          The very first step to setting up this forest is creating the root
          domain. This must be done before any steps, otherwise the other servers
          have no domain to join. In our example, the root domain is set up in
          the Calgary location by Member 1 with CAL-DC01.
        </p>
        <p>
          Since the server CAL-DC01 is running Standard with core, we only have
          the command prompt and PowerShell commands at our disposal. Simply copy
          and paste the blue commands below in your PowerShell console (you can
          open a PowerShell console by running the command &apos;Start
          PowerShell&apos; on the command prompt).
        </p>
        <ol>
          <li>
            <p>Set IP address:</p>
            <pre>
              <code>
                New-NetIPAddress -IPAddress 192.168.77.2 -PrefixLength 24
                -DefaultGateway 192.168.77.1 -InterfaceAlias Ethernet
              </code>
            </pre>
            <ul>
              <li>
                Your Interface Alias may be different from this. Double-check
                the name of your Interface Alias with the command
                Get-NetIPConfiguration
              </li>
            </ul>
          </li>
          <li>
            <p>Set time zone:</p>
            <pre>
              <code>{`Tzutil.exe /s "Eastern Standard Time"`}</code>
            </pre>
          </li>
          <li>
            <p>Rename computer:</p>
            <pre>
              <code>Rename-Computer -NewName CAL-DC01</code>
            </pre>
          </li>
          <li>
            <p>Restart computer to finalize renaming:</p>
            <pre>
              <code>Restart-Computer</code>
            </pre>
          </li>
          <li>
            <p>Install Active Directory:</p>
            <pre>
              <code>
                Install-WindowsFeature -Name AD-Domain-Services
                -IncludeManagementTools -IncludeAllSubFeature
              </code>
            </pre>
          </li>
          <li>
            <p>Promote to Domain Controller:</p>
            <pre>
              <code>{`Install-ADDSForest -DomainName "bigpotato.ca"`}</code>
            </pre>
            <ul>
              <li>
                This will create a domain called bigpotato.ca, so replace this
                with your own domain name
              </li>
              <li>
                You will also be prompted for a SafeModeAdministratorPassword
              </li>
            </ul>
          </li>
        </ol>
        <p>
          After executing these commands, your domain is ready for other domain
          controllers to join!
        </p>

        <h4>Joining Server Core Servers to the Root Domain</h4>
        <p>
          The PowerShell commands to join other domain controllers to the root
          domain are actually very similar to the ones for initially setting up
          the root domain. In our example, these are the commands to set up
          MIN-DC011. The process is similar for CAL-DC02, LON-DC01, LON-DC02,
          and MIN-DC022. Refer to the network diagram to ensure all the commands
          get the correct parameter values.{" "}
          <strong>
            Any values that are underlined in these commands will be different
            for each server.
          </strong>
        </p>
        <p>
          These are the PowerShell commands to join an existing domain:
        </p>
        <ol>
          <li>
            <p>Set IP address:</p>
            <pre>
              <code>
                New-NetIPAddress -IPAddress 192.168.233.2 -PrefixLength 24
                -DefaultGateway 192.168.233.1 -InterfaceAlias Ethernet
              </code>
            </pre>
          </li>
          <li>
            <p>Set time zone:</p>
            <pre>
              <code>{`Tzutil.exe /s "Eastern Standard Time"`}</code>
            </pre>
          </li>
          <li>
            <p>Rename computer:</p>
            <pre>
              <code>Rename-Computer -NewName MIN-DC011</code>
            </pre>
          </li>
          <li>
            <p>Restart computer to finalize renaming:</p>
            <pre>
              <code>Restart-Computer</code>
            </pre>
          </li>
          <li>
            <p>Install Active Directory:</p>
            <pre>
              <code>
                Install-WindowsFeature -Name AD-Domain-Services
                -IncludeManagementTools -IncludeAllSubFeature
              </code>
            </pre>
          </li>
          <li>
            <p>Set CAL-DC01 as DNS Server</p>
            <pre>
              <code>
                Set-DnsClientServerAddress -InterfaceAlias Ethernet
                -ServerAddresses(&quot;192.168.77.2&quot;)
              </code>
            </pre>
            <ul>
              <li>
                <strong>This is a VERY important step.</strong> Your other
                servers MUST point to the server that set up the root domain,
                otherwise your server will not be able to translate the domain
                name to the appropriate IP address
              </li>
            </ul>
          </li>
          <li>
            <p>Promote to Domain Controller and join existing domain:</p>
            <pre>
              <code>{`Install-ADDSDomainController -InstallDns -DomainName "bigpotato.ca" -Credential (Get-Credential "BIGPOTATO\\Administrator")`}</code>
            </pre>
            <ul>
              <li>
                You will be prompted to enter the credentials for CAL-DC01, NOT
                the administrator password for the computer you are physically
                using.
              </li>
              <li>
                You will also be prompted for a SafeModeAdministratorPassword
              </li>
              <li>
                Finally, you will also be warned that the server will be
                configured as a domain controller. Press Enter to accept the
                default
                <figure>
                  <img
                    src="/adds-forest/image002.png"
                    className="w-full rounded-lg"
                    alt="Domain controller promotion warning"
                  />
                </figure>
              </li>
              <li>
                Your server will need to restart before the promotion is complete
              </li>
            </ul>
          </li>
        </ol>
        <p>
          After executing these commands, your server will be joined to the root
          domain! Before starting Part 2, you should join all your servers to
          your root domain. The servers are: CAL-DC02, LON-DC01, LON-DC02,
          MIN-DC011, and MIN-DC022.
        </p>

        <h4>Joining a Client to the Domain</h4>
        <p>
          This section shows how to join a Client computer to the domain. The
          steps below are the settings for CAL-CL01, but can be used to configure
          any other client as long{" "}
          <strong>
            as the underlined values reflect those in the network diagram.
          </strong>
        </p>
        <p>
          <em>Configure DNS and IP address</em>
        </p>
        <ol>
          <li>Right-Click on the Network icon in the system tray.</li>
          <li>Select &quot;Open Network and Sharing Center&quot;</li>
          <li>
            In the section &quot;View your active Networks&quot; select
            &quot;Ethernet&quot;
          </li>
          <li>In the window that opens, select &quot;Properties&quot;</li>
          <li>
            Scroll through the items in the list and double-click on
            &quot;Internet Protocol Version 4 (TCP/IPv4)&quot;
          </li>
          <li>
            <p>
              Enter the following information (remember to replace the underlined
              values with the network diagram information):
            </p>
            <ul>
              <li>IP address: 192.168.77.4</li>
              <li>Subnet mask: 255.255.255.0</li>
              <li>Default Gateway: 192.168.77.1</li>
              <li>DNS server: 192.168.77.2</li>
            </ul>
          </li>
        </ol>
        <p>
          <em>Associate Client with Domain</em>
        </p>
        <p>
          Here are the steps to add your Windows client to the server&apos;s
          domain:
        </p>
        <ol>
          <li>
            Right-click on the Windows start charm (bottom-left hand of screen).
          </li>
          <li>Select &quot;System&quot;</li>
          <li>
            From the window that pops up, select &quot;Change settings…&quot;
          </li>
          <li>In the window that pops up, click the &quot;Change…&quot;</li>
          <li>
            Select &quot;Domain:&quot;, and enter the name of your server&apos;s
            domain (bigpotato.ca).
          </li>
          <li>
            Click OK, and you will be prompted to enter administrator credentials
            to give your client permission to join the domain. Enter
            &quot;administrator&quot; for the user name, and the administrator
            password{" "}
            <strong>for your Windows Server</strong> (not your client).
          </li>
          <li>
            After following these steps, you will see an alert welcoming you to
            the bigpotato.ca domain and be prompted to restart the computer.
          </li>
        </ol>
        <p>
          Once you restart, you will be part of the bigpotato.ca domain. In order
          to sign into the server&apos;s domain, you will need to select
          &quot;Other user&quot; when logging in on your Windows client. From
          there, you will be able to sign in as administrator to the bigpotato.ca
          domain.
        </p>
        <p>
          <em>Adding a Server to the Windows Client</em>
        </p>
        <p>
          Now that we can sign in as administrator to bigpotato.ca, we can access
          Server Manager from our Windows Client. But first, we need to add the
          server to our Server Manager. In this example below, I&apos;m going to
          add CAL-DC01 to CAL-CL01. To start this process, first sign in as
          administrator@bigpotato.ca on the Windows Client, then follow these
          steps:
        </p>
        <ol>
          <li>
            You should see a folder called &quot;Administrative Tools&quot; on
            your Desktop. Open it.
          </li>
          <li>Open the &quot;Server Manager&quot; shortcut.</li>
          <li>
            You should now see the Server Manager dashboard. Right-click on
            &quot;All Servers&quot; on the sidebar and select &quot;Add
            Servers&quot;
          </li>
          <li>
            <p>
              In the window that appears, click &quot;Find Now&quot;
            </p>
            <figure>
              <img
                src="/adds-forest/image004.png"
                className="w-full rounded-lg"
                alt="Add Servers dialog with Find Now button"
              />
            </figure>
          </li>
          <li>
            <p>
              The list on the left should populate with all machines that have
              joined the bigpotato.ca domain. Like below:
            </p>
            <figure>
              <img
                src="/adds-forest/image005.png"
                className="w-full rounded-lg"
                alt="Server list showing all domain machines"
              />
            </figure>
          </li>
          <li>
            Add the server you want to control from the client with the arrow in
            the middle (in this example, I will add CAL-DC01).
          </li>
          <li>Click OK.</li>
        </ol>
        <p>
          If you give Server Manager a few moments to refresh, you should then
          see the server you added and its roles appear in Server Manager. Now,
          we have GUI functionality with our Server Cores!
        </p>

        <h3>Configuring Active Directory Sites and Services</h3>
        <p>
          In this section, we will configure Active Directory Sites and Services
          so that the servers in our domain appear in the correct sites. We will
          create three sites: Calgary, London, and Minnesota, subnets associated
          with each site, and inter-site transports which will make the link
          between London and Minnesota a backup link.
        </p>
        <p>
          Please note that we created this section by following the steps in an{" "}
          <a href="http://itfreetraining.com/70-640/sites-and-subnets/">
            IT Free Training video
          </a>
          . In order to start working with the Sites and Services utility, open
          Server Manager, and from &quot;Tools&quot; select &quot;Active
          Directory Sites and Services&quot;.
        </p>

        <h4>Create Sites</h4>
        <p>
          When you first open the Sites and Services utility, and open up the
          file tree on the left, you will see all the servers that you have added
          under &quot;Default-First-Site-Name&quot;, like so:
        </p>
        <figure>
          <img
            src="/adds-forest/image006.png"
            className="w-full rounded-lg"
            alt="Sites and Services showing Default-First-Site-Name"
          />
        </figure>
        <p>
          The first thing we&apos;re going to do is rename that to reflect the
          first location, Calgary. You can do this by simply right-clicking on
          the site, and selecting &quot;rename&quot;.
        </p>
        <p>
          In order to create a new site, we&apos;re going to right-click on the
          &quot;Sites&quot; folder, and click &quot;New Site…&quot;. In the
          window that pops up, enter the name you want for your site (in our case
          it&apos;s London). We&apos;re going to need to select a link next. For
          now, just select DEFAULTIPSITELINK.
        </p>
        <p>Now, repeat this process to create a site for Minnesota.</p>
        <p>
          After the sites are created, we need to move the servers to the correct
          locations. This is a simple matter of dragging and dropping the servers
          to other containers. Try dragging MIN-DC022 to the &quot;Servers&quot;
          folder in Minnesota. You will get a warning telling you that moving the
          server may affect group policies. The warning looks like this:
        </p>
        <figure>
          <img
            src="/adds-forest/image007.png"
            className="w-full rounded-lg"
            alt="Warning about moving server affecting group policies"
          />
        </figure>
        <p>
          We have yet to create any group policies, so we can ignore this message
          for now (i.e. click &quot;Yes&quot;).
        </p>
        <p>
          Make sure to move the other servers to the correct locations. Your file
          tree should look like this:
        </p>
        <figure>
          <img
            src="/adds-forest/image008.png"
            className="w-full rounded-lg"
            alt="Sites and Services file tree with servers in correct locations"
          />
        </figure>

        <h4>Create Subnets</h4>
        <p>
          Next, we need to create subnets to associate with these sites. After
          following this process, if new servers are added to the domain, they
          will appear automatically in the correct site depending on their network
          ID. Recall that in our network diagram, our physical locations
          correspond with these network IDs:
        </p>
        <ul>
          <li>
            <strong>Calgary</strong>: 192.168.77.0/24
          </li>
          <li>
            <strong>London</strong>: 192.168.111.0/24
          </li>
          <li>
            <strong>Minnesota</strong>: 192.168.233.0/24
          </li>
        </ul>
        <p>
          In order to create these subnets, you will need to right-click on the
          &quot;Subnets&quot; folder and select &quot;New Subnet…&quot;. Enter
          the prefix using network prefix notation, as instructed. Then, select
          the appropriate site object for the prefix. In our case, 192.168.77.0/24
          is used for Calgary. Your entries should appear similar to this:
        </p>
        <figure>
          <img
            src="/adds-forest/image009.png"
            className="w-full rounded-lg"
            alt="New subnet dialog with Calgary subnet"
          />
        </figure>
        <p>
          Click &quot;Ok&quot;, and repeat the process for London and Minnesota.
          Your &quot;Subnets&quot; folder should look like this:
        </p>
        <figure>
          <img
            src="/adds-forest/image010.png"
            className="w-full rounded-lg"
            alt="Subnets folder showing all three subnets"
          />
        </figure>

        <h4>Create Inter-Site Transports</h4>
        <p>
          We&apos;re going to create site links between Calgary and London,
          Calgary and Minnesota, and London and Minnesota. For the purposes of
          this report, we&apos;re going to make the London-Minnesota link the
          &quot;back-up&quot; link, and make sure that Active Directory mainly
          replicates using the links to Calgary.
        </p>
        <p>
          For this report, we are going to create IP Inter-Site Transports. So,
          go into the IP folder, and in the blank space, right-click and select
          &quot;New Site Link…&quot;. Our links are only going to include two
          sites each. For this first example, add Calgary and London to the site
          link and click &quot;OK&quot;.
        </p>
        <figure>
          <img
            src="/adds-forest/image011.png"
            className="w-full rounded-lg"
            alt="New site link dialog with Calgary and London selected"
          />
        </figure>
        <p>
          Repeat this process for Calgary and Minnesota, and London and Minnesota.
        </p>
        <p>
          Now that our site links are created, you can safely delete
          &quot;DEFAULTIPSITELINK&quot;.
        </p>
        <p>
          In order to make the LON-MIN site link the back-up, we&apos;re going to
          reduce the cost. To do so, right-click on LON-MIN and select
          &quot;Properties&quot;.
        </p>
        <p>
          In the bottom section, you will see &quot;Cost&quot;. By default, it is
          at 100. We&apos;re going to reduce that slightly, to 90.
        </p>
        <figure>
          <img
            src="/adds-forest/image012.png"
            className="w-full rounded-lg"
            alt="LON-MIN site link properties with cost set to 90"
          />
        </figure>
        <p>
          After making the change, make sure to click &quot;OK&quot;. Now that
          the cost is lower, the servers will prefer to use the CAL-LON and
          CAL-MIN links for replication.
        </p>

        <h3>Configuring Servers</h3>
        <p>
          Now that all our servers and client machines have joined the
          bigpotato.ca domain, we can configure our servers using the RSAT tools
          on our clients; we just need to sign in as administrator@bigpotato.ca
          on our Windows Clients. In the following sections, we&apos;ll still
          make use of PowerShell commands, but some GUI steps will be mixed in as
          well.
        </p>

        <h4>Configuring DHCP on Server Cores</h4>
        <p>
          Each of our Server Cores are going to act as DHCP Servers. These are
          the PowerShell commands to install the DHCP server role, and configure
          DHCP. These are based on an article on FAQ Forge [1].
        </p>
        <p>Note that the underlined values will change depending on the server being configured. Here are the pools that will be created:</p>
        <ul>
          <li>
            <strong>Calgary</strong>: 192.168.77.111 - 192.168.77.222
          </li>
          <li>
            <strong>London</strong>: 192.168.111.111 - 192.168.111.222
          </li>
          <li>
            <strong>Minnesota</strong>: 192.168.233.111 - 192.168.233.222
          </li>
        </ul>
        <ol>
          <li>
            <p>Install the DHCP server role</p>
            <pre>
              <code>{`Install-WindowsFeature -Name 'DHCP' -IncludeManagementTools`}</code>
            </pre>
            <figure>
              <img
                src="/adds-forest/image013.png"
                className="w-full rounded-lg"
                alt="DHCP install output"
              />
            </figure>
          </li>
          <li>
            <p>Add DHCP Scope</p>
            <pre>
              <code>{`Add-DhcpServerV4Scope -Name "CAL DHCP Scope" -StartRange 192.168.77.111 -EndRange 192.168.77.222 -SubnetMask 255.255.255.0`}</code>
            </pre>
          </li>
          <li>
            <p>Add DNS Server, Router Gateway, Options in DHCP</p>
            <pre>
              <code>
                Set-DhcpServerV4OptionValue -DnsServer 192.168.77.2,142.55.100.25
                -Router 192.168.77.1
              </code>
            </pre>
          </li>
          <li>
            <p>Get your scope ID</p>
            <pre>
              <code>Get-DhcpServerV4Scope</code>
            </pre>
            <figure>
              <img
                src="/adds-forest/image014.png"
                className="w-full rounded-lg"
                alt="Get-DhcpServerV4Scope output"
              />
            </figure>
          </li>
          <li>
            <p>Set Up Lease Duration</p>
            <pre>
              <code>
                Set-DhcpServerV4Scope -ScopeID 192.168.77.2 -LeaseDuration
                1:00:00:00
              </code>
            </pre>
          </li>
          <li>
            <p>Restart DHCP Service</p>
            <pre>
              <code>Restart-Service dhcpserver</code>
            </pre>
            <figure>
              <img
                src="/adds-forest/image015.png"
                className="w-full rounded-lg"
                alt="DHCP service restart output"
              />
            </figure>
          </li>
        </ol>
        <p>
          Next, we&apos;re moving into Server Manager to make sure that
          everything was configured correctly. With these PowerShell commands,
          there&apos;s still some Post-Install configuration that we must
          finalize. You&apos;ll see an alert in Server Manager telling you that.
          Click the alert, and a wizard will launch. Simply commit to the
          default, and press OK when everything is done.
        </p>
        <figure>
          <img
            src="/adds-forest/image016.png"
            className="w-full rounded-lg"
            alt="Server Manager DHCP post-install alert"
          />
        </figure>
        <p>
          <em>Reservations with GUI</em>
        </p>
        <p>
          Next, we&apos;re going to create DHCP reservations. For our
          environment, we want all our Windows Clients to obtain the IP address
          X.X.X.110, depending on the location. For example, CAL-CL01 will always
          get 192.168.111.110.
        </p>
        <p>
          To create the reservation from DHCP Manager (open it via Server
          Manager), we need to get the MAC address for our client. To do that,
          make sure the client is obtaining its IP address and DNS servers
          automatically (it will get it from the DHCP server we just configured).
          The client should then appear under Address Leases in DHCP Manager,
          like so:
        </p>
        <figure>
          <img
            src="/adds-forest/image017.png"
            className="w-full rounded-lg"
            alt="DHCP Manager address leases"
          />
        </figure>
        <p>
          One of the columns you&apos;ll see is &quot;Unique ID&quot;. Write down
          that value.
        </p>
        <p>
          Next, right-click on Reservations and select &quot;New
          Reservation…&quot;. Fill in the information like so:
        </p>
        <figure>
          <img
            src="/adds-forest/image018.png"
            className="w-full rounded-lg"
            alt="New reservation dialog"
          />
        </figure>
        <p>
          To ensure that everything worked correctly, open the command prompt on
          the windows client and enter the commands &quot;ipconfig /release&quot;
          and &quot;ipconfig /renew&quot;. The output should show that your client
          got the appropriate IP address.
        </p>
        <figure>
          <img
            src="/adds-forest/image019.png"
            className="w-full rounded-lg"
            alt="ipconfig output showing reserved IP"
          />
        </figure>
        <p>
          <em>Reservations with PowerShell</em>
        </p>
        <p>
          Given the MAC address of a machine, you can create a DHCP reservation
          with this command:
        </p>
        <pre>
          <code>
            Add-DhcpServerV4Reservation -Name &quot;Robert Computer&quot;
            -ClientId 005056833c49 -IPAddress 192.168.77.100 -ScopeId
            192.168.77.0
          </code>
        </pre>
        <ul>
          <li>The client ID is the machine&apos;s MAC</li>
          <li>The IP Address is what they will be given</li>
          <li>
            Recall that you can get Scope ID with{" "}
            <code>Get-DhcpServerV4Scope</code>
          </li>
        </ul>

        <h4>Configuring Server GUIs to be Web Servers</h4>
        <p>
          Now, we&apos;re going to move on to our Servers with GUI (i.e.
          CAL-DC02, LON-DC02, MIN-DC022). This section will be carried out on
          CAL-DC02, but will be replicated on the other Server GUIs. We&apos;re
          going to install IIS on them and they will act as web servers that will
          display important Big Potato announcements. The steps to install IIS
          were taken from a Laser Fiche article [2].
        </p>
        <p>
          To install IIS, go into Server Manager and select Manager &gt; Add
          Roles and Features. When at the &quot;Server Selection&quot; page,
          select CAL-DC02 from the server pool. Keep the other options at their
          default and keep clicking &quot;Next&quot; until reaching Server Roles.
          Select the role &quot;Web Server (IIS)&quot; from the list:
        </p>
        <figure>
          <img
            src="/adds-forest/image020.png"
            className="w-full rounded-lg"
            alt="Server Roles showing Web Server (IIS) selected"
          />
        </figure>
        <p>
          Add the features required and keep options at their default. Install
          when prompted.
        </p>
        <p>
          <em>Editing the Default Web Site</em>
        </p>
        <p>
          Open the IIS Manager by right-clicking on CAL-DC02 in Server Manager
          &gt; IIS. When you open the file tree, you should see &quot;Default Web
          Site&quot; under sites. Right-click on it and select
          &quot;Explore&quot;, like so:
        </p>
        <figure>
          <img
            src="/adds-forest/image021.png"
            className="w-full rounded-lg"
            alt="IIS Manager showing Default Web Site explore option"
          />
        </figure>
        <p>
          You&apos;ll find yourself in a folder called &quot;wwwroot&quot; with
          two files in it. Right-click on iisstart and open with Notepad. You may
          write HTML in this file to test your ability to make changes.
        </p>
        <p>
          <em>Visiting the Website</em>
        </p>
        <p>
          On a client computer, you&apos;ll be able to access the website via the
          URL CAL-DC01.bigpotato.ca for now. We will create a DNS alias to give
          that a more user friendly name later. Regardless, you should be able to
          see the lovely website we created.
        </p>
        <figure>
          <img
            src="/adds-forest/image022.png"
            className="w-full rounded-lg"
            alt="Web browser showing the Big Potato website"
          />
        </figure>

        <h4>Configure DNS</h4>
        <p>
          DNS is installed by default on all Active Directory Domain Controllers.
          We will now add records to it.
        </p>
        <p>
          <em>Reverse Zone</em>
        </p>
        <p>
          The PowerShell command to add a DNS Reverse Zone in our environment is
          as follows:
        </p>
        <pre>
          <code>
            Add-DnsServerPrimaryZone -ReplicationScope &quot;Forest&quot;
            -NetworkId 192.168.77.0/24
          </code>
        </pre>
        <p>
          This command was found in a Read and Execute article [3].
        </p>
        <p>
          <em>Creating DNS Records</em>
        </p>
        <p>
          For each server, we are going to need to create the following DNS
          records:
        </p>
        <figure>
          <img
            src="/adds-forest/image023.png"
            className="w-full rounded-lg"
            alt="Table of DNS records to create"
          />
        </figure>
        <p>To create each of these A records for CAL-DC01, use the following commands:</p>
        <pre>
          <code>{`Add-DnsServerResourceRecordA -IPv4Address "192.168.77.1" -Name "cal-gw" -ZoneName "bigpotato.ca" -AllowUpdateAny -TimeToLive 01:00:00 -CreatePtr
Add-DnsServerResourceRecordA -IPv4Address "192.168.77.2" -Name "cal-dc01" -ZoneName "bigpotato.ca" -AllowUpdateAny -TimeToLive 01:00:00 -CreatePtr
Add-DnsServerResourceRecordA -IPv4Address "192.168.77.3" -Name "cal-dc02" -ZoneName "bigpotato.ca" -AllowUpdateAny -TimeToLive 01:00:00 -CreatePtr
Add-DnsServerResourceRecordA -IPv4Address "192.168.77.4" -Name "cal-dc03" -ZoneName "bigpotato.ca" -AllowUpdateAny -TimeToLive 01:00:00 -CreatePtr
Add-DnsServerResourceRecordCName -Name "calgary" -HostNameAlias "cal-dc02.bigpotato.ca" -ZoneName "bigpotato.ca"`}</code>
        </pre>
        <p>
          <em>Testing with nslookup</em>
        </p>
        <p>
          The following screenshots show that the A Records and Reverse Records
          were created successfully:
        </p>
        <figure>
          <img
            src="/adds-forest/image024.png"
            className="w-full rounded-lg"
            alt="nslookup output showing successful DNS records"
          />
        </figure>

        <h4>Creating Administrator Users</h4>
        <p>
          We are now going to create 4 users, one for each of our group members
          listed in the proposal section, and for our instructor for this course.
          Each of these users will be full domain administrators. Here are the
          PowerShell commands to create our 4 users:
        </p>
        <pre>
          <code>{`New-ADUser marmarie -UserPrincipalName "marmarie@bigpotato.ca" -GivenName Mariel -SurName Martinez -DisplayName "Mariel Martinez" -Path "DC=bigpotato,DC=ca" -AccountPassword (ConvertTo-SecureString -AsPlainText Secret123 -Force) -ChangePasswordAtLogon $true -Enabled $true
New-ADUser stonelak -UserPrincipalName "stonelak@bigpotato.ca" -GivenName Adam -SurName Stonelake -DisplayName "Adam Stonelake" -Path "DC=bigpotato,DC=ca" -AccountPassword (ConvertTo-SecureString -AsPlainText Secret123 -Force) -ChangePasswordAtLogon $true -Enabled $true
New-ADUser amalraj -UserPrincipalName "amalraj@bigpotato.ca" -GivenName Ramkumar -SurName Amalraj -DisplayName "Ramkumar Amalraj" -Path "DC=bigpotato,DC=ca" -AccountPassword (ConvertTo-SecureString -AsPlainText Secret123 -Force) -ChangePasswordAtLogon $true -Enabled $true
New-ADUser pearcero -UserPrincipalName "pearcero@bigpotato.ca" -GivenName Robert -SurName Pearce -DisplayName "Robert Pearce" -Path "DC=bigpotato,DC=ca" -AccountPassword (ConvertTo-SecureString -AsPlainText Secret123 -Force) -ChangePasswordAtLogon $true -Enabled $true`}</code>
        </pre>
        <p>
          We can confirm that our users were created by running the command{" "}
          <code>Get-ADUser -Filter *</code> and the output should include the
          users we created:
        </p>
        <figure>
          <img
            src="/adds-forest/image025.png"
            className="w-full rounded-lg"
            alt="Get-ADUser output showing created users"
          />
        </figure>
        <p>
          Now, in order to turn each of these users into a domain administrator,
          we will need to add them to the &quot;Domain Admins&quot; group. Here
          are the PowerShell commands to do that:
        </p>
        <pre>
          <code>
            Add-AdGroupMember -Identity &quot;Domain Admins&quot; -Members
            pearcero,marmarie,stonelak,Amalraj
          </code>
        </pre>
        <p>
          We can confirm that our users were added to the group by running{" "}
          <code>Get-AdGroupMember -Identity &quot;Domain Admins&quot;</code>:
        </p>
        <figure>
          <img
            src="/adds-forest/image026.png"
            className="w-full rounded-lg"
            alt="Get-AdGroupMember showing Domain Admins members"
          />
        </figure>

        <h4>Creating a Security Group</h4>
        <p>
          In order to create a security group and add our users to it, execute
          these commands:
        </p>
        <pre>
          <code>{`New-ADGroup -Name "TECHS" -GroupScope Global -GroupCategory Security -Path "DC=bigpotato,DC=ca"
Add-ADGroupMember -Identity TECHS -Members pearcero,marmarie,stonelak,Amalraj`}</code>
        </pre>
        <p>
          You can confirm that the users were added to this group with the command{" "}
          <code>Get-ADGroupMember -Identity TECHS</code>:
        </p>
        <figure>
          <img
            src="/adds-forest/image027.png"
            className="w-full rounded-lg"
            alt="Get-ADGroupMember output showing TECHS group members"
          />
        </figure>

        <h4>Creating a Share Folder on the Domain</h4>
        <p>
          We&apos;re going to need to create a shared folder that can be accessed
          throughout the domain. This will be created on CAL-DC02. We found the
          steps to create a shared folder in an{" "}
          <a href="http://www.woutermakkinje.com/?p=588">iKnowledge article</a>.
          These are those steps:
        </p>
        <ol>
          <li>Create a folder in the C:\ drive called &quot;techs&quot;</li>
          <li>
            <p>
              Right-click on the folder, select &quot;Properties&quot;, and in
              the &quot;Sharing&quot; tab, click &quot;Share…&quot;
            </p>
            <figure>
              <img
                src="/adds-forest/image028.png"
                className="w-full rounded-lg"
                alt="Folder sharing properties"
              />
            </figure>
          </li>
          <li>
            <p>
              Click the arrow in the combo box that appears and select &quot;Find
              people…&quot;
            </p>
            <figure>
              <img
                src="/adds-forest/image029.png"
                className="w-full rounded-lg"
                alt="File sharing find people option"
              />
            </figure>
          </li>
          <li>
            <p>
              In the objects section, enter &quot;techs&quot; and click &quot;Check
              Names&quot;. The object for the TECHS security group should appear,
              like so:
            </p>
            <figure>
              <img
                src="/adds-forest/image030.png"
                className="w-full rounded-lg"
                alt="TECHS security group found"
              />
            </figure>
          </li>
          <li>
            <p>
              Click Share, and you should now be able to access the folder and
              its contents from all other machines in the domain via the file
              path \\CAL-DC02\techs
            </p>
            <figure>
              <img
                src="/adds-forest/image031.png"
                className="w-full rounded-lg"
                alt="Shared folder confirmation"
              />
            </figure>
          </li>
        </ol>

        <h3>Populating the Domain with Objects</h3>
        <p>
          In this section, we will populate our servers with objects for users,
          organization units, and groups. For each location (Calgary, London,
          Minnesota), our goal is to create the following objects:
        </p>
        <ul>
          <li>6 Users</li>
          <li>3 Organizational Units (2 users in each)</li>
          <li>3 Groups (2 users in each)</li>
        </ul>
        <p>
          In the end, our domain will have 18 users, 9 organizational units, and
          3 groups. In our scenario, each of the domain controllers will be
          responsible for creating the above list of objects for their own
          locations. Therefore, even though this section will only show the
          commands needed to create these objects in the Calgary location, all of
          the other locations will repeat these steps (but replace some values
          with their own location name).
        </p>
        <p>
          Each location will name their objects with the prefix code for their
          location (i.e. CAL, LON, MIN).
        </p>

        <h4>Create OUs</h4>
        <p>The PowerShell commands to make organizational units are as follows:</p>
        <pre>
          <code>{`New-ADOrganizationalUnit "CALOU1" -path "DC=bigpotato,DC=ca"
New-ADOrganizationalUnit "CALOU2" -path "DC=bigpotato,DC=ca"
New-ADOrganizationalUnit "CALOU3" -path "DC=bigpotato,DC=ca"`}</code>
        </pre>
        <p>
          You can confirm your OUs were made with{" "}
          <code>Get-ADOrganizationalUnit</code>.
        </p>

        <h4>Create Groups</h4>
        <p>The PowerShell commands to make groups are as follows:</p>
        <pre>
          <code>{`New-ADGroup -Name "CALGroup1" -GroupScope Global -Path "DC=bigpotato,DC=ca"
New-ADGroup -Name "CALGroup2" -GroupScope Global -Path "DC=bigpotato,DC=ca"
New-ADGroup -Name "CALGroup3" -GroupScope Global -Path "DC=bigpotato,DC=ca"`}</code>
        </pre>

        <h4>Create Users</h4>
        <p>
          We are going to use a CSV file to create our users. Create the
          following CSV file using notepad (and remember to name it with a *.csv
          extension):
        </p>
        <pre>
          <code>{`Username,UPN,Path,Password
CALUser1,"caluser1@bigpotato.ca","OU=CALOU1,DC=bigpotato,DC=ca",Secret123
CALUser2,"caluser2@bigpotato.ca","OU=CALOU1,DC=bigpotato,DC=ca",Secret123
CALUser3,"caluser3@bigpotato.ca","OU=CALOU2,DC=bigpotato,DC=ca",Secret123
CALUser4,"caluser4@bigpotato.ca","OU=CALOU2,DC=bigpotato,DC=ca",Secret123
CALUser5,"caluser5@bigpotato.ca","OU=CALOU3,DC=bigpotato,DC=ca",Secret123
CALUser6,"caluser6@bigpotato.ca","OU=CALOU3,DC=bigpotato,DC=ca",Secret123`}</code>
        </pre>
        <p>
          We named our CSV file users-info.csv. Navigate to the location you
          saved your file, and execute this command:
        </p>
        <pre>
          <code>{`Import-Csv .\\users-info.csv | ForEach { New-ADUser $_.Username -UserPrincipalName $_.UPN -Path $_.Path -AccountPassword (ConvertTo-SecureString -AsPlainText $_.Password -Force) -ChangePasswordAtLogon $true -Enabled $true }`}</code>
        </pre>
        <p>
          You can confirm that your users were created with{" "}
          <code>Get-ADUser</code>.
        </p>

        <h4>Add Users to OUs and Groups</h4>
        <p>
          Finally, we are going to add our users to the OUs we created earlier
          with the following PowerShell commands:
        </p>
        <pre>
          <code>{`Add-ADGroupMember -Identity CALGroup1 -Members CALUser1,CALUser2
Add-ADGroupMember -Identity CALGroup2 -Members CALUser3,CALUser4
Add-ADGroupMember -Identity CALGroup3 -Members CALUser5,CALUser6`}</code>
        </pre>
        <p>
          Confirm that the users were added to the correct groups with{" "}
          <code>Get-ADGroupMember</code>.
        </p>

        <h3>Conclusion</h3>
        <p>
          After following this report, you should have a fully configured Active
          Directory Domain Controller in multiple locations, all connected to the
          same domain. Those domain controllers will act as DNS and DHCP servers
          for its location. You will also have a web server in each location that
          serves specific information for that location. Finally, you should have
          many user accounts that can have different functions and privileges.
        </p>
        <p>
          The PowerShell commands of this report should be particularly helpful
          in automating tedious processes that are repeated for each location. You
          now have the tools to expand an organization&apos;s Active Directory
          Domain, fictional or otherwise, into locations all over the world!
          Thank you for following along.
        </p>

        <h3>References</h3>
        <ol>
          <li>
            <a href="https://www.faqforge.com/windows/configure-dhcp-powershell/">
              How to Configure DHCP with PowerShell on FAQForge
            </a>
          </li>
          <li>
            <a href="https://www.laserfiche.com/support/webhelp/workflow/9.0/en-us/content/resources/Configuration/Installation%20and%20Migration/IIS%20Windows%20Server%202012.htm">
              Installing IIS Components Windows Server 2012 on Laser Fiche
            </a>
          </li>
          <li>
            <a href="https://readandexecute.com/how-to/server-2016/dns/configure-reverse-lookup-zone-with-powershell-windows-server-core-2016/">
              Configure Reverse Lookup Zone with PowerShell – Windows Server Core
              2016 on Read and Execute
            </a>
          </li>
          <li>
            Lecture material by Robert Pearce from SYST 23551 – Windows
            Administration, taken at Sheridan College (2019)
          </li>
        </ol>
      </div>
    </div>
  );
}
