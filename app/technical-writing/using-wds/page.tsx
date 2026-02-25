import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Using Windows Domain Services",
};

export default function UsingWDSPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/technical-writing"
        className="inline-flex items-center gap-1.5 text-sm text-indigo-600 hover:underline mb-8"
      >
        <ArrowLeft size={14} /> Technical Writing
      </Link>

      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <h2>Windows Domain Services</h2>

        <h2>Introduction</h2>
        <p>
          The following report will describe what Windows Deployment Services
          (WDS) is, and how it works. It will give a detailed description of the
          history, use cases, software and hardware requirements needed, and
          benefits of using WDS. The next portion of this report will give the
          steps on how to configure a Windows Server with DHCP and DNS, which are
          needed for WDS. It will also configure WDS. The final section will
          implement WDS in a virtual environment, and will show the steps of how
          to capture the image of a Windows 8.1 OS and push that image to a blank
          virtual machine. By following this report, you will have the knowledge
          to use and implement WDS in your own environment.
        </p>
        <p>
          The environment that this report is using contains the following
          components:
        </p>
        <ol>
          <li>1 x Router running pfSense</li>
          <li>1 x Server 2012 R2 Standard with GUI</li>
          <li>1 x Windows 8.1 Client (this will serve as the gold master)</li>
          <li>
            1 x Blank Virtual Machine with no OS installed (this is what we will
            push the Windows 8.1 image to)
          </li>
        </ol>
        <p>
          The environment in this report is running off the server virtualization
          platform called VMware vSphere. That said, the steps within Part 2 and
          Part 3 can be followed on any physical machine, and the image that is
          captured can be pushed to any number of blank machines.
        </p>

        <h3>What is Windows Deployment Services?</h3>
        <p>
          Windows Deployment Services (WDS) allows users to deploy Windows
          operating systems using network-based installation, without the need of
          physically visiting each computer [1]. In the situation described above,
          instead of having to touch each laptop individually and install the OS
          with physical media, you could use WDS to install Windows over the
          network!
        </p>
        <h4>History</h4>
        <p>
          Before WDS succeeded it, Microsoft had a feature included in Windows
          2000 Server called Remote Installation Service (RIS). RIS allowed
          network administrators to install Windows 2000 Professional operating
          system and its upgrades to any number of client computers at one time
          from a centralized controller [2]. Unlike WDS though, RIS does not use
          disk imaging [3]. Because of this, RIS was only able to install a
          limited number of operating systems, whereas WDS is able to support
          Windows Vista, Windows 7/8/10, Windows Server 2012/2016, and more.
        </p>
        <h4>How It Works</h4>
        <p>
          As mentioned above, WDS uses imaging in order to deploy operating
          systems. Imaging is the process of taking a snapshot of the whole hard
          disk of any computer or server, and storing it to a file. This single
          file contains an entire OS installation [4]. WDS takes that image and
          is able to deploy it to multiple computers over a network at the same
          time. Imaging is the reason that WDS does not need to have any physical
          media involved.
        </p>
        <h4>Benefits of WDS</h4>
        <p>
          Below are some reasons to choose WDS over manual or other deployment
          methods [5][6]
        </p>
        <ul>
          <li>
            Saves system administrator time in deploying the operating system
          </li>
          <li>Reduces complexity and cost</li>
          <li>
            Transmits the data using multicast functionality which reduces network
            congestion
          </li>
          <li>
            Allows you to create a reference image of a computer using its Image
            Capture wizard
          </li>
          <li>
            Allows you to deploy driver packages to client computers along with
            install images
          </li>
          <li>
            Can be used to transition workstations and servers with a previous
            operating system to Windows Vista and Windows Server 2008
          </li>
          <li>
            Offers improved management capabilities: WDS can be managed both from
            an MMC snap-in and through the command line with WDSUTIL.EXE
          </li>
          <li>Integrates with Active Directory</li>
        </ul>
        <h4>Software and Hardware Requirements</h4>
        <p>The following components are required in order to use WDS [7]:</p>
        <ul>
          <li>
            Server running Windows Server 2003 SP1 (Windows Server 2008 or newer
            highly recommended)
          </li>
          <li>DHCP services running on the network</li>
          <li>DNS services running on the network</li>
          <li>
            Storage drive(s) formatted with NTFS for storing deployment images
          </li>
          <li>
            Active Directory Domain Services (Optional, Standalone mode may be
            used unless choosing to run WDS in Integrated mode, which does
            require being a member of the domain or DC)
          </li>
          <li>Administrative credentials</li>
        </ul>
        <p>
          Please note that while Active Directory Domain Services is optional for
          WDS, this tutorial will show the steps of how to configure DHCP and DNS
          on an Active Directory Domain Controller in the next section.
        </p>

        <h3>Configuring Windows Server with DNS, DHCP, and WDS</h3>
        <p>
          Now that we understand what WDS is, how it works, and why it would be
          beneficial, let&apos;s jump into how to install and implement it into
          your Windows Server. As mentioned in the previous section, we will need
          DNS and DHCP configured in order to use WDS. For our purposes, we are
          going to be using a Windows Server that is an Active Directory Domain
          Controller. If you already have ADDS, DNS, and DHCP installed and
          configured, you can skip to the final part of this section.
        </p>
        <h4>Active Directory</h4>
        <p>
          This section contains a list of PowerShell commands that will configure
          your Windows Server, install Active Directory, and promote it to a
          Domain Controller. Simply copy and paste the blue commands into your
          PowerShell console. This section is essentially a summary of SYST 23551
          Assignment 1, so if you want more information on this process, you can
          take a look at that report.
        </p>
        <ol>
          <li>
            <p>Set IP address:</p>
            <pre>
              <code>
                New-NetIPAddress -IPAddress 10.100.50.2 -PrefixLength 24
                -DefaultGateway 10.100.50.1 -InterfaceAlias Ethernet0
              </code>
            </pre>
            <ul>
              <li>
                The network address for this IP address is simply
                10.100.50.0/24; ensure that your router is configured
                appropriately and has the IP address 10.100.50.1
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
              <code>Rename-Computer -NewName DC01</code>
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
              <code>{`Install-ADDSForest -DomainName "mariel.ca"`}</code>
            </pre>
            <ul>
              <li>
                This will create a domain called mariel.ca, so replace this with
                your own domain name
              </li>
            </ul>
          </li>
        </ol>

        <h4>DNS</h4>
        <p>
          The commands above will have installed DNS with Active Directory by
          default. To see if DNS was installed successfully, you can check Server
          Manager. It should appear at the side like so:
        </p>
        <figure>
          <img
            src="/using-wds/image001.png"
            className="w-full rounded-lg"
            alt="Server Manager showing DNS installed"
          />
        </figure>
        <p>
          The next step is to configure DNS. In order to do so, you will need to
          open DNS Manager by right-clicking on the white space on the left, and
          selecting DNS Manager:
        </p>
        <figure>
          <img
            src="/using-wds/image002.png"
            className="w-full rounded-lg"
            alt="Server Manager DNS Manager option"
          />
        </figure>
        <p>
          <em>Create a Reverse Zone</em>
        </p>
        <p>
          Configuring a reverse zone is not something that the average Windows
          Server user will typically need. However, in cases where it is
          necessary, it is best to do this step before configuring any other DNS
          settings. This will save you from some tedious backtracking in the
          long-run. If you know for sure that you will not need a reverse zone,
          then you can skip this section.
        </p>
        <p>
          To create a Reverse Zone using GUI, look at the toolbar in DNS Manager
          and select Action &gt; New Zone. This will open the New Zone Wizard.
          When reaching the Zone Type section, select Primary Zone and the
          checkbox to store the zone in Active Directory. These are the default
          options below.
        </p>
        <figure>
          <img
            src="/using-wds/image003.png"
            className="w-full rounded-lg"
            alt="New Zone Wizard zone type selection"
          />
        </figure>
        <p>
          When selecting Active Directory Zone Replication Scope, your choice
          depends on your needs. In our case, we only have one server which
          comprises our entire forest. Therefore, option A and B below are
          essentially the same thing. However, with environments with multiple
          trees and domains, then this choice will have a much bigger impact.
          What it comes down to is thinking about how far do you want this zone
          information to go: across this domain, or across the entire forest? In
          our case, we are simply choosing the default option &quot;To all DNS
          servers running on domain controllers in this domain&quot;.
        </p>
        <figure>
          <img
            src="/using-wds/image004.png"
            className="w-full rounded-lg"
            alt="Active Directory Zone Replication Scope"
          />
        </figure>
        <p>
          For Reverse Lookup Zone Name, just select the default again: &quot;IPv4
          Reverse Lookup Zone&quot;.
        </p>
        <p>
          Next, the wizard will ask for the Reverse Lookup Zone Name. The only
          thing you need to input is the network ID for your network. In our
          case, this is 10.100.50.0. You will only need to enter the bits that
          are part of the network mask, which is only the first 3 bytes:
        </p>
        <figure>
          <img
            src="/using-wds/image005.png"
            className="w-full rounded-lg"
            alt="Reverse Lookup Zone Name configuration"
          />
        </figure>
        <p>The Reverse lookup zone name will be generated automatically for us.</p>
        <p>
          Choose the default option in the next page again (Allow only secure
          dynamic updates).
        </p>
        <p>
          The final page of the wizard will confirm the settings you selected.
          Click &quot;Finish&quot; and the new reverse zone will have been
          created.
        </p>
        <p>
          <em>Create an A Record (Forward Lookup Zone)</em>
        </p>
        <p>
          In this section we will create an A record for our server. This means
          that DNS will be able to retrieve the IP address from a domain name. We
          will create an A record for our router.
        </p>
        <p>
          In DNS Manager, open the containers on the left like so: DC01.mariel.ca
          &gt; Forward Lookup Zones &gt; mariel.ca, and right click in the
          whitespace on the right and select &quot;New Host A or AAAA&quot;:
        </p>
        <figure>
          <img
            src="/using-wds/image006.png"
            className="w-full rounded-lg"
            alt="DNS Manager new host option"
          />
        </figure>
        <p>
          Since this record is for our router, the name is just router. The IP
          address is 10.100.50.1. We will also select &quot;Create associated
          pointer (PTR) record&quot;; this will create an entry in reverse lookup
          zones.
        </p>
        <figure>
          <img
            src="/using-wds/image007.png"
            className="w-full rounded-lg"
            alt="New host record configuration"
          />
        </figure>
        <p>
          Click &quot;Add Host&quot; and the record will be created for router.
          Test that it worked correctly by opening a command prompt and entering
          the command &quot;ping router&quot;, which should be successful.
        </p>

        <h4>DHCP</h4>
        <p>
          The next requirement for WDS is DHCP. We will install DHCP on our
          server and configure it with GUI below.
        </p>
        <p>
          <em>Install DHCP</em>
        </p>
        <p>
          Go to Server Manager, and under Manage, select &quot;Add Roles and
          Features&quot; to open up a wizard. &quot;Select Role-based or
          feature-based installation&quot; as the installation type, your server
          from the server pool, and when you reach &quot;Server Roles&quot;
          select the checkbox for DHCP server, like so:
        </p>
        <figure>
          <img
            src="/using-wds/image008.png"
            className="w-full rounded-lg"
            alt="Server Roles showing DHCP selected"
          />
        </figure>
        <p>
          Select &quot;Add Features&quot; in the window that pops up. This will
          install any prerequisite tools that are required before you can install
          DHCP.
        </p>
        <p>
          Keep clicking &quot;Next&quot; in the wizard, keeping each option at
          its default value. When you get to the final window, click
          &quot;Install&quot;, and wait for the process to finish.
        </p>
        <p>
          In the menu on the left of Server Manager, DHCP should have appeared.
          Click on it, and you should see a warning telling you that DHCP
          requires configuration. Click &quot;More…&quot; to configure.
        </p>
        <figure>
          <img
            src="/using-wds/image009.png"
            className="w-full rounded-lg"
            alt="DHCP configuration warning in Server Manager"
          />
        </figure>
        <p>
          In the window that pops up, you will need to click &quot;Complete DHCP
          configuration&quot;, which will open the DHCP Post-Install
          configuration wizard. Simply keep everything at its default value,
          click &quot;Commit&quot;, and close the window when everything is done.
        </p>
        <p>
          You should now be able to open the DHCP Manager in the same way we did
          for DNS Manager. Simply right-click on your DC01 server in Server
          Manager (under DHCP), and select &quot;DHCP Manager&quot;, like so:
        </p>
        <figure>
          <img
            src="/using-wds/image010.png"
            className="w-full rounded-lg"
            alt="DHCP Manager option"
          />
        </figure>
        <p>
          <em>Configure DHCP</em>
        </p>
        <p>
          In DHCP Manager, we are now going to create a new DHCP scope using
          another wizard. Open this up by looking at the toolbar, and selecting
          Action &gt; New Scope.
        </p>
        <p>
          You can name your new scope anything you want. In our case, we will
          name it &quot;Client Scope&quot; and describe it as &quot;Scope to be
          used for clients in domain&quot;.
        </p>
        <figure>
          <img
            src="/using-wds/image011.png"
            className="w-full rounded-lg"
            alt="New DHCP scope name and description"
          />
        </figure>
        <p>
          When selecting the IP Range, we are going to use the range 10.100.50.100
          to 10.100.50.150. Be wary of the default configuration settings. Be
          sure to change the length to 24 before clicking &quot;Next&quot;.
        </p>
        <figure>
          <img
            src="/using-wds/image012.png"
            className="w-full rounded-lg"
            alt="DHCP IP range configuration"
          />
        </figure>
        <p>
          The next page is to Add Exclusions and Delay. We do not need exclusions
          in our environment and we will keep the subnet delay at 0 for this
          example. Therefore, we&apos;re essentially skipping this page.
        </p>
        <figure>
          <img
            src="/using-wds/image013.png"
            className="w-full rounded-lg"
            alt="DHCP exclusions and delay"
          />
        </figure>
        <p>
          Next, we will be asked for lease duration. The default for this will be
          8 days. Since I am working on a virtual network, I am going to keep
          this at the default 8 days.
        </p>
        <p>
          The next page will ask if we want to configure the DHCP options for
          this scope now. Select &quot;Yes&quot; and click &quot;Next&quot;.
        </p>
        <p>
          The Router (Default Gateway) will have an IP address of 10.100.50.1.
          Enter that in the text box, and make sure to click &quot;Add&quot;
          before going to the next page.
        </p>
        <figure>
          <img
            src="/using-wds/image014.png"
            className="w-full rounded-lg"
            alt="DHCP router/gateway configuration"
          />
        </figure>
        <p>
          The next page will ask for the domain name and DNS servers. Since this
          server is tied to active directory, it has already recognized what we
          need. You can add the specific address you need for internet
          connectivity here.
        </p>
        <figure>
          <img
            src="/using-wds/image015.png"
            className="w-full rounded-lg"
            alt="DHCP DNS server configuration"
          />
        </figure>
        <p>
          The next page asks for WINS server, we will not need to do anything
          there, so just click &quot;Next&quot;.
        </p>
        <p>When asked if you want to &quot;Activate Scope&quot;, select Yes.</p>
        <p>
          When you reach the last page and click &quot;Finish&quot;, you will be
          able to see everything we added in the DHCP manager.
        </p>

        <h4>WDS</h4>
        <p>
          Now that DNS and DHCP are installed and configured, we can finally get
          into the meat of this report and start working with WDS.
        </p>
        <p>
          <em>Installing WDS</em>
        </p>
        <p>
          The process of installing is going to look very similar to when we
          added DHCP as a role. From Server Manager, go to Manage and select
          &quot;Add Roles and Features&quot;. Again, select the default options
          until we get to the Server Roles page. Look for &quot;Windows
          Deployment Services&quot; and select that checkbox.
        </p>
        <figure>
          <img
            src="/using-wds/image016.png"
            className="w-full rounded-lg"
            alt="Server Roles showing Windows Deployment Services selected"
          />
        </figure>
        <p>
          Again, select &quot;Add Features&quot; when prompted to add all
          prerequisite features you need before configuring WDS. Keep choosing
          &quot;Next&quot; and keeping things at their default values. Confirm
          and click &quot;Install&quot; when prompted.
        </p>
        <p>
          Like DHCP before, after the process is finished, we should see WDS show
          up in server manager. To start using WDS, we are going to right-click
          on DC01 and launch &quot;Windows Deployment Services Management
          Console&quot;. We will be working in this console in the next section.
        </p>

        <h3>Implement WDS to Capture Image Push to a Blank Client</h3>
        <p>
          If you followed along to Part 2, you should have DNS, DHCP, and WDS
          installed on your server, and be able to open your Windows Deployment
          Services Management Console. This next section will show you how to
          configure WDS and prepare your gold master Windows client to be
          captured.
        </p>
        <h4>Configuring WDS</h4>
        <p>
          In the Windows Deployment Services Management Console, we are going to
          start by integrating WDS with Active Directory. When you open up the
          containers for Servers, you will see that there is a small warning
          symbol beside your server. Right-click on your server and select
          &quot;Configure Server&quot;.
        </p>
        <figure>
          <img
            src="/using-wds/image017.png"
            className="w-full rounded-lg"
            alt="WDS Management Console configure server option"
          />
        </figure>
        <p>
          In the wizard that opens, click &quot;Next&quot; and select the install
          option called &quot;Integrated with Active Directory&quot;.
        </p>
        <p>
          You will then be asked for the path to the remote installation folder.
          At this point, it is important to note that ideally, this Path should
          be on a separate drive from your OS. For my purposes, I am going to
          just install the path on my C:\\ drive. In a production environment,
          this is absolutely not recommended. For yourself, you should map to
          another drive.
        </p>
        <p>
          The next page will ask for Proxy DHCP Server settings. The proxy server
          should be checked automatically because we configured DHCP in the
          previous section. Therefore, keep everything as it is and select
          &quot;Next&quot;.
        </p>
        <figure>
          <img
            src="/using-wds/image018.png"
            className="w-full rounded-lg"
            alt="WDS Proxy DHCP Server settings"
          />
        </figure>
        <p>
          The next page is for PXE Server Initial Settings. We are NOT going to
          use the default settings on this page. We are going to select
          &quot;Respond to all client computers (known and unknown)&quot;.
        </p>
        <p>
          After clicking &quot;Next&quot;, you should see a quick load screen.
          Click &quot;Finish&quot;, and we will fix any remaining issues.
        </p>
        <p>
          The wizard should close, and you should see DC01 with more containers
          in the management console. But, there will be a black square on it.
          This means that it is not running. Therefore, right-click on your
          server, go to All Tasks and select &quot;Start&quot;.
        </p>
        <figure>
          <img
            src="/using-wds/image019.png"
            className="w-full rounded-lg"
            alt="WDS server tasks menu showing Start option"
          />
        </figure>
        <p>
          The WDS service should start, and you will see a little green play
          button on your server.
        </p>
        <p>
          <em>Adding a Boot Image</em>
        </p>
        <p>
          Now that WDS is running, we are going to open up the containers in
          DC01 until we get to the folder called &quot;Boot Images&quot;. You
          will see that there are no items to show, because we have not added a
          boot image yet. Right-click in the blank space and select &quot;Add
          Boot Image…&quot;.
        </p>
        <figure>
          <img
            src="/using-wds/image020.png"
            className="w-full rounded-lg"
            alt="WDS Boot Images section with Add Boot Image option"
          />
        </figure>
        <p>
          You are obviously going to need a boot image for this step. You will
          need a boot.wim image for your own purposes, so browse and navigate to
          the folder you have it.
        </p>
        <figure>
          <img
            src="/using-wds/image021.png"
            className="w-full rounded-lg"
            alt="Add Boot Image file browser"
          />
        </figure>
        <p>
          At the Image Metadata page, I will use the name and description
          &quot;Deploy / Install&quot;.
        </p>
        <p>
          In the summary page, confirm the information and click &quot;Next&quot;.
          A task will begin to add the boot image to your server. You should now
          see the boot image in your WDS management console.
        </p>
        <p>
          <em>Boot Configuration</em>
        </p>
        <p>
          Now that the boot image is installed, we are going to need to configure
          a boot policy. To change this, we are going to right-click on our
          server and select &quot;Properties&quot;.
        </p>
        <p>
          Within the property windows, go to &quot;Boot&quot;, and change the
          Boot Policy to &quot;Continue the PXE boot unless the user presses the
          ESC key&quot; for BOTH Known clients and Unknown clients. We want this
          for both because the gold master Windows 8.1 client is an unknown
          client currently.
        </p>
        <figure>
          <img
            src="/using-wds/image022.png"
            className="w-full rounded-lg"
            alt="WDS boot policy configuration"
          />
        </figure>
        <p>
          Because we&apos;ve made changes to the service properties, we should
          restart WDS. Do this by right-clicking on your server, going to
          &quot;All Tasks&quot; and selecting &quot;Restart&quot;.
        </p>

        <h4>Capturing Windows 8.1 Client Image</h4>
        <p>
          <em>Create Capture Boot Image</em>
        </p>
        <p>
          We previously created a boot.wim image. We are now going to use that
          file to create a capture image. To do so, right-click on the &quot;Deploy
          / Install&quot; image under boot images, and select &quot;Create Capture
          Image…&quot;.
        </p>
        <figure>
          <img
            src="/using-wds/image023.png"
            className="w-full rounded-lg"
            alt="Create Capture Image option"
          />
        </figure>
        <p>
          Enter the image name and description as &quot;Capture&quot;. Then, add
          the location and file name. Save it to
          C:\RemoteInstall\Boot\x64\Images\capture.wim. This is the same
          location as boot.wim.
        </p>
        <figure>
          <img
            src="/using-wds/image024.png"
            className="w-full rounded-lg"
            alt="Capture image name and location"
          />
        </figure>
        <p>
          A task will then begin that will create the image. When it is done,
          select the checkbox option &quot;Add image to the Windows Deployment
          server now&quot;, and &quot;Finish&quot;.
        </p>
        <figure>
          <img
            src="/using-wds/image025.png"
            className="w-full rounded-lg"
            alt="Add image to WDS server option"
          />
        </figure>
        <p>
          Enter the appropriate metadata in the prompt. When you are done, you
          should see the new capture image under Boot Images.
        </p>
        <figure>
          <img
            src="/using-wds/image026.png"
            className="w-full rounded-lg"
            alt="Boot Images showing new capture image"
          />
        </figure>
        <p>
          Next, we will need to create an image group. Simply go to the &quot;Install
          Images&quot; folder within your WDS console manager and right-click on
          the blank space. Select &quot;Add Image Group&quot;. I simply named
          mine &quot;ImageGroup1&quot;.
        </p>
        <figure>
          <img
            src="/using-wds/image027.png"
            className="w-full rounded-lg"
            alt="Install Images showing ImageGroup1"
          />
        </figure>
        <p>
          <em>Fixing the Winload.exe Error</em>
        </p>
        <p>
          While we are still working with your WDS server, we are going to get
          ahead of a problem that will surely happen. If you were to skip this
          section and try to capture your Windows 8.1 client now, you will
          encounter the error below:
        </p>
        <figure>
          <img
            src="/using-wds/image028.png"
            className="w-full rounded-lg"
            alt="Winload.exe error"
          />
        </figure>
        <p>
          Essentially, one of the Windows updates interferes with WDS being able
          to create a capture image, and triggers this error. To avoid getting
          this error yourself, we&apos;re going to use the DISM utility.
        </p>
        <p>
          Essentially, all you need to do is mount and remount your capture image
          in a folder on your server. First, you will need to go into your C:\
          drive and create a temporary folder to which we will mount our image.
          My folder is C:\MountDir.
        </p>
        <p>
          Next, open up a command prompt with administrator privileges. In order
          to mount our capture.wim image, enter the following command:
        </p>
        <pre>
          <code>{`dism /mount-wim /wimfile:"C:\\RemoteInstall\\Boot\\x64\\Images\\capture.wim" /mountdir:"C:\\MountDir" /index:1`}</code>
        </pre>
        <figure>
          <img
            src="/using-wds/image029.png"
            className="w-full rounded-lg"
            alt="DISM mount output"
          />
        </figure>
        <p>
          Now, we just need to unmount that image and commit any changes. The
          command to do so is as follows:
        </p>
        <pre>
          <code>{`dism /unmount-win /mountdir:"C:\\MountDir" /commit`}</code>
        </pre>
        <figure>
          <img
            src="/using-wds/image030.png"
            className="w-full rounded-lg"
            alt="DISM unmount output"
          />
        </figure>
        <p>
          This simple process will fix the winload.exe error that the capture
          image would otherwise trigger.
        </p>

        <h4>Starting Capture</h4>
        <p>
          In the previous sections, we have been working on our Active Directory
          server. Now, we can finally turn on our gold master Windows 8.1 Client
          and prepare it for capture.
        </p>
        <p>
          First, we must ensure that our client will open into BIOS. Booting into
          BIOS will be different depending on your machine.
        </p>
        <p>
          <em>Editing Boot Options on vSphere</em>
        </p>
        <p>
          For any vSphere users, we will need to right-click on the Windows 8.1
          VM and select &quot;Edit settings&quot;. Under the &quot;VM
          Options&quot; tab, we will expand the &quot;Boot Options&quot; section.
          We are going to select the option to boot into BIOS the next time we
          power on the machine.
        </p>
        <figure>
          <img
            src="/using-wds/image031.png"
            className="w-full rounded-lg"
            alt="vSphere boot options configuration"
          />
        </figure>
        <p>
          <em>BIOS</em>
        </p>
        <p>
          Now, power on the Windows machine into BIOS. Navigate to the
          &quot;Boot&quot; tab, and highlight &quot;Network boot from Intel
          E1000e&quot;. Press SHIFT and PLUS until that option is at the top.
        </p>
        <figure>
          <img
            src="/using-wds/image032.png"
            className="w-full rounded-lg"
            alt="BIOS boot order configuration"
          />
        </figure>
        <p>
          Next, navigate to the &quot;Exit&quot; tab and select &quot;Exit Saving
          Changes&quot;. The client will now restart and go into network boot.
        </p>
        <p>
          <em>Booting Up the Win 8.1 Client</em>
        </p>
        <p>When your client restarts, you should see something similar to this:</p>
        <figure>
          <img
            src="/using-wds/image033.png"
            className="w-full rounded-lg"
            alt="Client making DHCP request on network boot"
          />
        </figure>
        <p>
          What&apos;s happening is that your client is making a DHCP request to
          your server. After some time, you should obtain a client IP address,
          and see the output below:
        </p>
        <figure>
          <img
            src="/using-wds/image034.png"
            className="w-full rounded-lg"
            alt="Client obtained IP address from DHCP"
          />
        </figure>
        <p>
          You should now have the option to choose an operating system to start.
          You&apos;ll see the two images that we added to WDS here. Select
          &quot;Capture&quot;.
        </p>
        <figure>
          <img
            src="/using-wds/image035.png"
            className="w-full rounded-lg"
            alt="WDS boot menu showing Capture and Deploy options"
          />
        </figure>
        <figure>
          <img
            src="/using-wds/image036.png"
            className="w-full rounded-lg"
            alt="Loading capture image"
          />
        </figure>
        <p>You will now launch into the WDS capture wizard.</p>
        <p>
          <em>Capture Wizard</em>
        </p>
        <p>
          Please note that throughout this section, you will not have access to
          your mouse cursor. You will need to navigate through this wizard using
          the TAB key to move between options, and ENTER to select an option. The
          capture wizard should open into a welcome window:
        </p>
        <figure>
          <img
            src="/using-wds/image037.png"
            className="w-full rounded-lg"
            alt="WDS capture wizard welcome screen"
          />
        </figure>
        <p>
          When you click next, you will be prompted to choose a directory to
          capture from. Only volumes that contain operating systems prepared with
          sysprep will appear. For me, that is the D:\ drive. Name your image
          and give it a description that is appropriate for your needs.
        </p>
        <figure>
          <img
            src="/using-wds/image038.png"
            className="w-full rounded-lg"
            alt="Capture wizard directory and image name"
          />
        </figure>
        <p>
          Next, we will need to specify where the install image will be saved to
          [9]. I simply browsed to the D:\ drive and named it win8_capture.wim.
          Then, select the optional option to upload the image to WDS. Enter your
          server name (DC01), and select &quot;Connect&quot;. You will need to
          enter your fully qualified administrator user name (e.g.
          administrator@mariel.ca) and the appropriate password. After entering
          your credentials, select ImageGroup1 (which we created on the WDS
          server in the previous section).
        </p>
        <figure>
          <img
            src="/using-wds/image039.png"
            className="w-full rounded-lg"
            alt="Capture wizard WDS upload settings"
          />
        </figure>
        <p>
          When you select next, the task of capturing your Windows 8.1 client
          will begin. Depending on your environment and resources, this may take
          a long time. Maybe grab a snack while you are waiting for this step to
          complete!
        </p>
        <figure>
          <img
            src="/using-wds/image040.png"
            className="w-full rounded-lg"
            alt="Capture progress bar"
          />
        </figure>
        <p>When your capture is ready, you should see this screen:</p>
        <figure>
          <img
            src="/using-wds/image041.png"
            className="w-full rounded-lg"
            alt="Capture complete screen"
          />
        </figure>
        <p>
          Click &quot;Finish&quot;, and head over to your WDS server. Within the
          WDS management console, you should see the win8_capture image under
          ImageGroup1:
        </p>
        <figure>
          <img
            src="/using-wds/image042.png"
            className="w-full rounded-lg"
            alt="WDS management console showing win8_capture image"
          />
        </figure>

        <h4>Pushing Our Image to the Blank Client</h4>
        <p>
          Now that we have successfully captured the Windows 8.1 image, we can
          now deploy that onto our blank client. The first step is to power on
          your blank client into BIOS.
        </p>
        <p>
          From BIOS, do the same thing as with the Windows 8.1 client (i.e. move
          &quot;Network boot from Intel E1000e&quot; to the top of the boot
          options and then &quot;Exit Saving Changes&quot;.
        </p>
        <p>
          You should see the blank client network boot, and obtain an IP address
          using your DHCP server. Now instead of selecting &quot;Capture&quot;,
          select &quot;Deploy / Install&quot;
        </p>
        <figure>
          <img
            src="/using-wds/image043.png"
            className="w-full rounded-lg"
            alt="WDS boot menu with Deploy/Install selected"
          />
        </figure>
        <p>You will now see a Windows Setup wizard appear.</p>
        <p>
          <em>Setup Wizard</em>
        </p>
        <p>
          Again, we may only navigate this wizard with the keyboard. With that in
          mind, select &quot;Next&quot;.
        </p>
        <figure>
          <img
            src="/using-wds/image044.png"
            className="w-full rounded-lg"
            alt="Windows Setup wizard"
          />
        </figure>
        <p>Enter your credentials like so:</p>
        <figure>
          <img
            src="/using-wds/image045.png"
            className="w-full rounded-lg"
            alt="Credentials entry screen"
          />
        </figure>
        <p>
          You should be able to see the win8_capture image. Select it and press
          &quot;Next&quot;.
        </p>
        <figure>
          <img
            src="/using-wds/image046.png"
            className="w-full rounded-lg"
            alt="Image selection showing win8_capture"
          />
        </figure>
        <p>
          Choose the drive you want to install Windows on and select
          &quot;Next&quot;. The installation process should begin.
        </p>
        <figure>
          <img
            src="/using-wds/image047.png"
            className="w-full rounded-lg"
            alt="Installation progress"
          />
        </figure>
        <p>
          During this process, your client will restart. Make sure that the next
          time you boot into BIOS, you restore the boot options back to default.
        </p>
        <p>
          When the installation process is done, you will be given the out of box
          experience. Go through it and set up your client to your preferences.
          Note that you can now use your mouse cursor!
        </p>
        <figure>
          <img
            src="/using-wds/image048.png"
            className="w-full rounded-lg"
            alt="Out of box experience screen"
          />
        </figure>

        <h4>Configuring the Blank Client</h4>
        <p>
          <em>Add Client to Domain</em>
        </p>
        <p>
          In order to add this new client to our active directory domain, you
          will need to change the client&apos;s DNS server to your server&apos;s
          IP address, go to System Properties, change the domain, and enter your
          administrator credentials for your Windows server. See Assignment 1 for
          more detailed instructions.
        </p>
        <figure>
          <img
            src="/using-wds/image049.png"
            className="w-full rounded-lg"
            alt="Client domain join"
          />
        </figure>
        <p>
          You will need to restart the machine after doing this, and when it
          turns back on you can log into the administrator account of the
          mariel.ca domain.
        </p>
        <p>
          <em>Creating a DHCP Reservation and DNS A Record</em>
        </p>
        <p>
          We want to create a DHCP reservation for this client. In order to do
          this, you will need to get the MAC address of your client. An easy way
          to do this is to open your DHCP Manager from Server Manager. Under the
          Scope which we created much earlier in this report, you will see
          CL-WIN8 under Address Leases.
        </p>
        <figure>
          <img
            src="/using-wds/image050.png"
            className="w-full rounded-lg"
            alt="DHCP address leases showing CL-WIN8"
          />
        </figure>
        <p>
          Now, right-click on &quot;Reservations&quot; and select &quot;New
          Reservation…&quot;.
        </p>
        <figure>
          <img
            src="/using-wds/image051.png"
            className="w-full rounded-lg"
            alt="New Reservation option"
          />
        </figure>
        <p>
          You will be prompted to enter your reservation information. Enter the
          fully qualified name of your client under Reservation Name, enter the
          IP address you want it to always have, type out the MAC address you
          copied down, and give it whatever description you want. Finally, select
          the supported types you want and click &quot;Add&quot;.
        </p>
        <figure>
          <img
            src="/using-wds/image052.png"
            className="w-full rounded-lg"
            alt="New reservation details"
          />
        </figure>
        <p>
          Now that we have created the reservation, we need to release and get
          the IP address from the DHCP server. Open a command prompt on the
          client, and enter the following two commands:
        </p>
        <pre>
          <code>ipconfig /release</code>
        </pre>
        <pre>
          <code>ipconfig /renew</code>
        </pre>
        <figure>
          <img
            src="/using-wds/image053.png"
            className="w-full rounded-lg"
            alt="ipconfig release and renew output showing reserved IP"
          />
        </figure>
        <p>
          As you can see above, the DHCP server should give the IP address that
          the reservation assigned.
        </p>
        <p>
          After that, open DNS Manager just to ensure that everything is working
          correctly. You should see the appropriate IP address next to CL-WIN8.
        </p>
        <figure>
          <img
            src="/using-wds/image054.png"
            className="w-full rounded-lg"
            alt="DNS Manager showing CL-WIN8 A record"
          />
        </figure>
        <p>The reverse zone entry should also have been created, as below.</p>
        <figure>
          <img
            src="/using-wds/image055.png"
            className="w-full rounded-lg"
            alt="DNS reverse zone entry for CL-WIN8"
          />
        </figure>
        <p>Once you&apos;ve reached this point, your client is ready to go!</p>

        <h3>Conclusion</h3>
        <p>
          After following this report, you should have a good understanding of
          what Windows Deployment Services (WDS) is and how it works. You should
          have the practical knowledge to be able to install DNS, DHCP, and WDS
          to an Active Directory Domain Controller. And finally, you should be
          able to capture an OS image from another machine, and deploy that to a
          blank machine. All of this should have helped you refine your Windows
          administration skills. Thank you for following along.
        </p>

        <h3>References</h3>
        <ol>
          <li>
            <a href="https://docs.microsoft.com/en-us/windows/desktop/wds/windows-deployment-services-portal">
              Windows Deployment Services on Windows Dev Center
            </a>
          </li>
          <li>
            <a href="https://whatis.techtarget.com/definition/Remote-Installation-Service-RIS">
              Remote Installation Service (RIS) on Tech Target by Margaret Rouse
            </a>
          </li>
          <li>
            <a href="https://en.wikipedia.org/wiki/Windows_Deployment_Services">
              Windows Deployment Services on Wikipedia
            </a>
          </li>
          <li>
            <a href="https://www.utilizewindows.com/description-of-windows-deployment-services-wds/">
              Description of Windows Deployment Services (WDS) by Utilize Windows
            </a>
          </li>
          <li>
            <a href="https://www.itprotoday.com/mobile-management-and-security/configuring-windows-deployment-services-server-2012-r2-dhcp-running">
              Configuring Windows Deployment Services on IT Pro Today by Karim
              Budzar
            </a>
          </li>
          <li>
            <a href="https://sourcedaddy.com/windows-7/benefits-using-windows-deployment-services.html">
              Benefits of Using Windows Deployment Services on Source Daddy
            </a>
          </li>
          <li>
            <a href="https://www.techrepublic.com/article/how-to-get-started-with-windows-deployment-services/">
              How to get started with Windows Deployment Services by Jesus Vigo
            </a>
          </li>
          <li>
            <a href="https://community.spiceworks.com/topic/472581-wds-capture-image-winload-exe-corrupt-or-missing?page=1#entry-3651117">
              WDS Capture Image – winload.exe corrupt or missing by kconner,
              reply by John Masson
            </a>
          </li>
          <li>
            <a href="http://www.itingredients.com/how-to-capture-image-and-deploy-image-/using-wds/">
              How to CAPTURE Image and Deploy Image using WDS on IT Ingredients
              by Raakesh Kapoor
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
