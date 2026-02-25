import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Set Up Active Directory Domain Services",
};

export default function SetupADDSPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/technical-writing"
        className="inline-flex items-center gap-1.5 text-sm text-indigo-600 hover:underline mb-8"
      >
        <ArrowLeft size={14} /> Technical Writing
      </Link>

      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <h2>Set Up Active Directory Domain Services</h2>

        <h2>Introduction</h2>
        <p>
          The following report gives step by step instructions on how to
          transition a full installation of Windows Server 2012 down to Core. It
          will then show you how to use this new environment to configure a
          server using only a CLI interface.
        </p>
        <p>
          Together, we will install Active Directory to our server and promote it
          to a Domain Controller using PowerShell commands. We will also be using
          commands to create new organizational units, security groups, and
          users. A Windows Client will also be added to the domain that we will
          create. Following this report and completing all these steps should help
          refine your skills using PowerShell.
        </p>
        <p>
          Please note that throughout this report, PowerShell commands are
          highlighted so that you can simply copy and paste them into your own
          PowerShell terminals while following along. However, I&apos;d recommend
          physically typing them out, so that you can become more familiar with
          the PowerShell syntax.
        </p>

        <h2>Transition from GUI to Server Core</h2>
        <p>
          After Windows Server 2012 has been installed with GUI, there are two
          ways to transition the server to Core. It can be done using either the
          GUI interface, or with PowerShell commands. This report will go through
          the transition steps using PowerShell. These steps were taken from the
          TechRepublic article by Jesus Vigo titled How to switch between GUI and
          Core in Windows Server 2012 using PowerShell, with some details added
          by myself (See full article here:{" "}
          <a href="https://www.techrepublic.com/article/how-to-switch-between-gui-and-core-in-windows-server-2012-using-powershell/">
            https://www.techrepublic.com/article/how-to-switch-between-gui-and-core-in-windows-server-2012-using-powershell/
          </a>
          ).
        </p>
        <ol>
          <li>
            Log on to your server with an account that has administrative rights
            on that server.
          </li>
          <li>
            <p>
              Run PowerShell as an Administrator and elevate User Account Control
              permissions, if prompted. You can do this by clicking on the
              taskbar shortcut on Windows Server 2012.
            </p>
            <p>
              If that shortcut is not there, you can also open Task Manager
              (CTRL+ALT+DELETE). Ensure that you have expanded it to show
              &quot;More details&quot;. Click &quot;File&quot;, then &quot;Run
              new task&quot;. In the dialog box that pops up, type
              &quot;powershell&quot; and be sure to check off the box that says
              &quot;Create this task with administrative privileges.&quot; Click
              &quot;OK&quot; and the PowerShell terminal will open.
            </p>
            <figure>
              <img
                src="/setup-adds/image001.png"
                alt="The command to create a new task and open the PowerShell terminal"
                className="w-full rounded-lg"
              />
            </figure>
          </li>
          <li>
            <p>
              Uninstalling the two Windows features that are associated with
              Server GUI (Server-Gui-Shell and Server-Gui-Mgmt-Infra) will enable
              Server Core. The features may be uninstalled individually by
              replacing *gui* after the -Name switch below or uninstalled together
              by entering the following command:
            </p>
            <pre>
              <code>
                Get-WindowsFeature -Name *gui* | Remove-WindowsFeature -Restart
              </code>
            </pre>
            <p>
              Press enter to execute the command. Your terminal will show the
              removal progress, like in the image below. Wait for the process to
              complete.
            </p>
            <figure>
              <img
                src="/setup-adds/image002.png"
                alt="The output of running the commands Get-WindowsFeature -Name *gui* | Remove-WindowsFeature -Restart"
                className="w-full rounded-lg"
              />
            </figure>
          </li>
          <li>
            <p>
              Once the uninstallation has completed, the server will need to
              reboot. The -Restart argument will carry out that operation
              automatically. After reboot, the server will display the logon
              screen as usual, except in Server Core after authenticating, only
              the command prompt will be displayed, like below.
            </p>
            <figure>
              <img
                src="/setup-adds/image003.png"
                alt="What windows server looks like after gui has been removed"
                className="w-full rounded-lg"
              />
            </figure>
          </li>
        </ol>
        <p>
          The Server GUI is now removed! You still have all the capabilities of
          Windows Server 2012, but now you will need to use the command prompt
          and PowerShell terminal.
        </p>
        <h4>Quick Tips for Navigating the Core Environment</h4>
        <p>
          If you ever accidentally close the command prompt window, you can still
          open a new window. Simply open Task Manager (CTRL+ALT+DELETE), click
          &quot;File&quot;, &quot;Run new task&quot;, and type &quot;cmd&quot;.
          When you run the task, your command prompt window will be back good as
          new!
        </p>
        <p>
          We will be using many PowerShell commands throughout the rest of the
          report. You can start PowerShell by typing the command
          &quot;powershell&quot; in your command prompt. You can return to the
          command prompt with the command &quot;exit&quot;. If you want a
          dedicated window to execute PowerShell commands, you can open a new
          window by executing &quot;start powershell&quot; in the command prompt.
        </p>

        <h3>Configure LAN Interface and IP Addresses</h3>
        <p>
          Now that the GUI is removed, we will learn how to configure the network
          properties of the server with terminal commands.
        </p>
        <h4>Configuring pfSense</h4>
        <p>
          The particular environment that I have uses pfSense. For my
          environment, I will need to configure the pfSense router in order to
          set the foundation for the rest of my network. The following images
          shows the welcome screen for pfSense after bootup:
        </p>
        <figure>
          <img
            src="/setup-adds/image004.png"
            alt="The menu pfsense shows at start up"
            className="w-full rounded-lg"
          />
        </figure>
        <p>
          The network address <strong>192.168.10.0/24</strong> will be used for
          this report. The pfSense LAN interface will need to be modified to
          reflect the new gateway address. The steps to configure this are below:
        </p>
        <ol>
          <li>
            In the menu presented above, select Set interface(s) IP address by
            entering <strong>2</strong>.
          </li>
          <li>
            The next menu will ask you what interface you want to modify. Select
            the LAN interface by entering <strong>2</strong>.
          </li>
          <li>
            You will then be asked for an IP address. This interface will act as
            the default gateway for the network. Enter the IP address as{" "}
            <strong>192.168.10.1</strong>
          </li>
          <li>
            You will then need to enter a subnet mask. Enter it in CIDER notation
            as <strong>24</strong>.
          </li>
          <li>
            The next menu will prompt you to enter a new LAN IPv4 upstream
            gateway address. This is only relevant for WAN interfaces. This is
            not a WAN, so press <strong>ENTER</strong> for none.
          </li>
          <li>
            The next prompt will allow you to enter the IPv6 address. This is
            unnecessary for our purposes, so <strong>ENTER</strong> for none.
          </li>
          <li>
            You will then be asked if you want to enable DHCP. Enter{" "}
            <strong>n</strong> for no.
          </li>
          <li>
            Finally, you will be asked to revert to HTTP. We want to continue
            using HTTPS (it is more secure), therefore enter <strong>n</strong>{" "}
            for no.
          </li>
        </ol>
        <p>
          After following the steps above, the changes will be saved. The output
          should be as follows:
        </p>
        <figure>
          <img
            src="/setup-adds/image005.png"
            alt="The output of pfsense after changing the network settings"
            className="w-full rounded-lg"
          />
        </figure>
        <p>The LAN interface has now been successfully configured.</p>

        <h4>Set Hostname and IP address with PowerShell</h4>
        <p>
          The server will need a recognizable hostname and IP address. Here are
          the steps to configure these properties via PowerShell:
        </p>
        <ol>
          <li>
            <p>
              The IP address that we want for the server is 192.168.10.5/24. The
              default gateway is the LAN interface that we configured above
              (192.168.10.1). Enter the following command to configure this:
            </p>
            <pre>
              <code>
                New-NetIPAddress -IPAddress 192.168.10.5 -PrefixLength 24
                -DefaultGateway 192.168.10.1 -InterfaceAlias Ethernet0
              </code>
            </pre>
            <p>You should have the following output:</p>
            <figure>
              <img
                src="/setup-adds/image006.png"
                alt="The output of PowerShell after the command New-NetIPAddress"
                className="w-full rounded-lg"
              />
            </figure>
            <p>
              Please note that the InterfaceAlias may be different on your
              machine. You can view your interface alias with this command:
            </p>
            <pre>
              <code>Get-NetIPAddress</code>
            </pre>
          </li>
          <li>
            <p>
              Your server is likely running on Pacific Standard Time. In order to
              change your time zone to EST (or your particular time zone), use
              execute the following command:
            </p>
            <pre>
              <code>{`Tzutil.exe /s "Eastern Standard Time"`}</code>
            </pre>
          </li>
          <li>
            <p>
              The hostname we want for our server is DC01. In order to rename
              your server&apos;s hostname, execute the following command:{" "}
              <code>Rename-Computer -NewName DC01</code>
            </p>
          </li>
          <li>
            <p>
              After renaming your server, you will need to reboot the machine. Do
              so with this command:
            </p>
            <pre>
              <code>Restart-Computer</code>
            </pre>
          </li>
        </ol>
        <p>
          After following these steps, your machine will have a new name, new IP
          address, and be in the correct time zone.
        </p>

        <h3>Active Directory and Domain Controller Promotion</h3>
        <p>
          In order to install Active Directory, one simply needs to execute a
          single PowerShell command. For my purposes, the domain I am creating
          will be called &quot;marmarie.lab&quot;. The PowerShell command that
          you can copy and paste to install active directory is this:
        </p>
        <pre>
          <code>
            Install-WindowsFeature -Name AD-Domain-Services
            -IncludeManagementTools IncludeAllSubFeatures
          </code>
        </pre>
        <p>This command will then display a progress screen like this:</p>
        <figure>
          <img
            src="/setup-adds/image007.png"
            alt="The progress screen of PowerShell after the command Install-WindowsFeature"
            className="w-full rounded-lg"
          />
        </figure>
        <p>The output after completion should look like this:</p>
        <figure>
          <img
            src="/setup-adds/image008.png"
            alt="The output of PowerShell after Install-WindowsFeature completes"
            className="w-full rounded-lg"
          />
        </figure>
        <p>
          After the installation is complete, you still need to promote your
          server to a domain controller. Please note that the domain Netbios name
          is dependant on your domainname. The extended command to do so is as
          follows:
        </p>
        <pre>
          <code>{`Install -ADDSForest -CreateDnsDelegation:$false -Databasepath "C:\\Windows\\NTDS" -DomainMode "Win2012R2" -DomainName "marmarie.lab" -DomainNetbiosName "MARMARIE" -ForestMode "Win2012R2" -InstallDns:$true -LogPath "C:\\Windows\\NTDS" -NoRebootOnCompletion:$false -SysvolPath "C:\\Windows\\SYSVOL" -Force:$true`}</code>
        </pre>
        <p>
          That said, many of the arguments given are the default values. So, if
          you want a shorter command to do the same thing as above, simply enter
          this:
        </p>
        <pre>
          <code>{`Install-ADDSForest -DomainName "marmarie.lab"`}</code>
        </pre>
        <p>
          After entering either -ADDSForest command above, you will need to enter
          a Safe Mode Administrator Password. Do so, and make sure that it is
          both secure and something that you can remember. You should then see
          something like this:
        </p>
        <figure>
          <img
            src="/setup-adds/image009.png"
            alt="The output of PowerShell after creating an Active Directory forest"
            className="w-full rounded-lg"
          />
        </figure>
        <p>
          You will be prompted to restart the computer to complete the promotion
          process. Do so, and after restarting your server should successfully
          have been promoted to a domain controller.
        </p>

        <h3>Add Windows Client to Domain</h3>
        <p>
          You can now add a Windows Client to the domain that you have create.
          The following section will go through the steps to do so. Please note,
          the steps below must be done on a Windows Client running Windows 8.1 or
          above. These should not be done on your server.
        </p>
        <h4>Configure DNS and IP Address</h4>
        <p>
          In order for your client to be able to translate the domain name of
          your server to its IP address, DNS must be properly configured. Your
          client must also be on the same network as your server. In order to
          configure these settings, follow these steps:
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
              The IP address for the client computer in this report will be
              192.168.10.10. It will use the same default gateway as the server
              (192.168.10.1), and use the Windows 2012 Server as its DNS server
              (recall that its IP address is 192.168.10.5). Enter that
              information like so:
            </p>
            <figure>
              <img
                src="/setup-adds/image010.png"
                alt="The properties window to configure IPv4 network address and DNS statically"
                className="w-full rounded-lg"
              />
            </figure>
            <p>
              Be sure to click OK in the above window, as well as OK in the
              Ethernet properties window before it. After doing so, the network
              settings are sufficient to allow you to add your Windows client to
              your domain.
            </p>
          </li>
        </ol>

        <h4>Associate Client with Domain</h4>
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
            In the search bar of the window that pops up, type the words
            &quot;domain&quot;
          </li>
          <li>
            <p>
              One of the options that comes up should be &quot;Join a
              domain&quot;. Select it.
            </p>
            <figure>
              <img
                src="/setup-adds/image011.png"
                alt="The icon that allows a user to join a domain"
                className="w-full rounded-lg"
              />
            </figure>
          </li>
          <li>
            <p>
              In the window that pops up, click the &quot;Change…&quot; button
              to change the domain (highlighted below).
            </p>
            <figure>
              <img
                src="/setup-adds/image012.png"
                alt="The systems properties window with the Change... button highlighted"
                className="w-full rounded-lg"
              />
            </figure>
          </li>
          <li>
            <p>
              In the window that appears, you can change your computer name (mine
              is WIN8). But the important bit is to select &quot;Domain:&quot;
              under the section &quot;Member of&quot;, and enter the name of your
              server&apos;s domain (in my case marmarie.lab).
            </p>
            <figure>
              <img
                src="/setup-adds/image013.png"
                alt="The window which allows a user to change their computer's name and enter a domain to join"
                className="w-full rounded-lg"
              />
            </figure>
          </li>
          <li>
            <p>
              Click OK, and you will be prompted to enter administrator
              credentials to give your client permission to join the domain.
              Enter &quot;administrator&quot; for the user name, and the
              administrator password <strong>for your Windows Server</strong>{" "}
              (not your client).
            </p>
            <figure>
              <img
                src="/setup-adds/image014.png"
                alt="A window to enter a username and password"
                className="w-full rounded-lg"
              />
            </figure>
          </li>
          <li>
            <p>After following these steps, you will see this alert:</p>
            <figure>
              <img
                src="/setup-adds/image015.png"
                alt="An alert saying Welcome to the marmarie.lab domain"
                className="w-full rounded-lg"
              />
            </figure>
            <p>
              You will then be prompted to restart your computer. Do so, and when
              you restart, you will be able to sign into an account on your
              server&apos;s domain.
            </p>
          </li>
        </ol>
        <p>
          In order to sign into your server&apos;s domain, you will need to
          select &quot;Other user&quot; when logging in on your Windows client.
          Of course, we have yet to create any users for your client to sign in,
          so we can&apos;t test this out just yet. After going through the next
          few sections of this report, you will be able to sign in as a user of
          marmarie.lab (or whatever your domain is called). You can see how to do
          so at the end of Step 7: Create Users.
        </p>

        <h3>Create Organizational Units</h3>
        <p>
          The next step is to create organizational units within your domain. The
          following steps should be carried out on your Windows 2012 Server, and
          be executed as PowerShell commands. Here are the steps to create
          organizational units:
        </p>
        <ul>
          <li>
            <p>
              We want to create two organizational units, one called
              &quot;Sales&quot; and another called &quot;Techs&quot;. Here are
              the two commands to create them:
            </p>
            <pre>
              <code>{`New-ADOrganizationalUnit "Sales" -path "DC=marmarie,DC=lab"`}</code>
            </pre>
            <pre>
              <code>{`New-ADOrganizationalUnit "Techs" -path "DC=marmarie,DC=lab"`}</code>
            </pre>
            <p>
              Please note that you can&apos;t enter periods within the string
              argument for path. Therefore, instead of entering a period, you
              will need to enter period-separated words as separate &quot;DC&quot;
              arguments.
            </p>
            <p>
              After executing each command, you should see no feedback. That is
              good, that means no errors were made in your syntax.
            </p>
          </li>
          <li>
            <p>
              To confirm that the organizational units have been created
              successfully, enter the following command:
            </p>
            <pre>
              <code>{`Get-ADOrganizationalUnit -Filter 'Name -like "*"'`}</code>
            </pre>
            <p>
              This command will display all organizational units on your domain,
              including the ones you have just created. Modify the filter if you
              have many organizational units already, and just want to see the
              ones you have just created (e.g.{" "}
              <code>{`'Name -like "Sales"'`}</code>). Learn more about this
              command on Microsoft&apos;s documentation website (
              <a href="https://docs.microsoft.com/en-us/powershell/module/activedirectory/get-adorganizationalunit?view=winserver2012-ps">
                https://docs.microsoft.com/en-us/powershell/module/activedirectory/get-adorganizationalunit?view=winserver2012-ps
              </a>
              ).
            </p>
            <p>
              Here is what my output for that command looks like after creating
              my organizational units:
            </p>
            <figure>
              <img
                src="/setup-adds/image016.png"
                alt="The output showing what organizational units were created. Sales and Techs appear."
                className="w-full rounded-lg"
              />
            </figure>
          </li>
        </ul>

        <h3>Create Security Groups</h3>
        <p>
          You will now want to create security groups within your organizational
          units. Here are the steps to do so:
        </p>
        <ol>
          <li>
            <p>
              We are going to create two security groups, one called secSales,
              and one called secTechs. secSales and secTechs will be nested
              within the organizational units Sales and Techs, respectively. Here
              are the commands to create them:
            </p>
            <pre>
              <code>{`New-ADGroup "secSales" -GroupScope Global -Path "OU=Sales,DC=marmarie,DC=lab"`}</code>
            </pre>
            <pre>
              <code>{`New-ADGroup "secTechs" -GroupScope Global -Path "OU=Techs,DC=marmarie,DC=lab"`}</code>
            </pre>
            <p>
              Similar to when we created the organizational units, executing
              these commands should give no output. Otherwise, an error has
              occurred.
            </p>
          </li>
          <li>
            <p>
              To confirm that these security groups were created successfully, run
              the following command:
            </p>
            <pre>
              <code>{`Get-ADGroup -Filter 'Name -like "sec*"'`}</code>
            </pre>
            <p>
              Learn more about this command here:{" "}
              <a href="https://docs.microsoft.com/en-us/powershell/module/addsadministration/get-adgroup?view=win10-ps">
                https://docs.microsoft.com/en-us/powershell/module/addsadministration/get-adgroup?view=win10-ps
              </a>
            </p>
            <p>Here is what my output looks like:</p>
            <figure>
              <img
                src="/setup-adds/image017.png"
                alt="The output shows the security groups secSales and secTechs."
                className="w-full rounded-lg"
              />
            </figure>
          </li>
        </ol>

        <h3>Create Users</h3>
        <p>
          Finally, we need to create users for our domain. Within this report we
          will be creating 6 users, 3 in each of the organizational units that we
          created in Step 5.
        </p>
        <h4>Creating Users with a CSV File</h4>
        <p>
          We will be doing this with a csv file. This is a scalable method for
          creating users, because one single PowerShell command can be used to
          create thousands of users within a csv file. In this section, I will
          show you the format for the csv file so that you can make your own, and
          expand on it whenever you need to. Here are the steps to create users
          with a csv file:
        </p>
        <ol>
          <li>
            <p>
              In order to create the csv file for this exercise, run the
              following PowerShell command:
            </p>
            <pre>
              <code>Notepad</code>
            </pre>
            <p>
              The notepad application will launch, and you will be able to create
              a file to store your users&apos; information. You will need the
              following headings: Username, UPN, GivenName, Surname,
              DisplayName, Path, and Password. The records in the file will need
              to be in that order. Here is the contents of my csv file that you
              can copy and paste into your own:
            </p>
            <pre>
              <code>{`Username,UPN,GivenName,Surname,DisplayName,Path,Password
spilgrim,"spilgrim@marmarie.lab",Scott,Pilgrim,"Scott Pilgrim","OU=Sales,DC=marmarie,DC=lab",Secret123
rflowers,"rflowers@marmarie.lab",Ramona,Flowers,"Ramona Flowers","OU=Sales,DC=marmarie,DC=lab",Secret123
kchau,"kchau@marmarie.lab",Knives,Chau,"Knives Chau","OU=Sales,DC=marmarie,DC=lab",Secret123
kpine,"kpine@marmarie.lab",Kim,Pine,"Kim Pine","OU=Techs,DC=marmarie,DC=lab",Secret123
sstills,"sstills@marmarie.lab",Stephen,Stills,"Stephen Stills","OU=Techs,DC=marmarie,DC=lab",Secret123
wwells,"wwells@marmarie.lab",Wallace,Wells,"Wallace Wells","OU=Techs,DC=marmarie,DC=lab",Secret123`}</code>
            </pre>
            <p>
              Please note that each of the entries in the csv files should be in
              one line. Each of these represents a record in a table.
            </p>
          </li>
          <li>
            Save the file as users-info.csv. Be sure not to save it as a .txt
            file by mistake. I saved my file in the absolute path
            C:\Users\Administrator\Documents\user-info.csv, but you can save
            yours anywhere as long as you remember where.
          </li>
          <li>
            <p>Next, you will need to execute the following command:</p>
            <pre>
              <code>{`Import-Csv .\\Documents\\users-info.csv | ForEach { New-ADUser $_.Username -UserPrincipalName $_.UPN -GivenName $_.GivenName -Surname $_.Surname -DisplayName $_.DisplayName -Path $_.Path -AccountPassword (ConvertTo-SecureString -AsPlainText $_.Password -Force) -ChangePasswordAtLogon $true -Enabled $true }`}</code>
            </pre>
            <p>
              Executing this command will create a user for each record within
              the csv file. If everything was done correctly, you shouldn&apos;t
              see any output, and therefore no errors occurred.
            </p>
          </li>
          <li>
            <p>
              Finally, we will want to confirm that our users were created
              successfully. Here are the commands to see the users within our
              Sales and Techs organizational units, and the output that I have on
              my server when executing them:
            </p>
            <pre>
              <code>{`Get-ADUser -Filter * -SearchBase "OU=Sales,DC=marmarie,DC=lab"`}</code>
            </pre>
            <figure>
              <img
                src="/setup-adds/image018.png"
                alt="The PowerShell output shows the users spilgrim, rflowers, and kchau in the Sales OU"
                className="w-full rounded-lg"
              />
            </figure>
            <pre>
              <code>{`Get-ADUser -Filter * -SearchBase "OU=Techs,DC=marmarie,DC=lab"`}</code>
            </pre>
            <figure>
              <img
                src="/setup-adds/image019.png"
                alt="The PowerShell output shows the users kpine, sstills, and wwells in the Techs OU"
                className="w-full rounded-lg"
              />
            </figure>
          </li>
        </ol>

        <h4>Logging in as a User on the Windows Clients</h4>
        <p>
          Now that we have users on our domain, members of the domain will be
          able to sign in as these users. Let&apos;s go back to our Windows
          Client to sign in. Here are the steps to sign in:
        </p>
        <ol>
          <li>
            From the login screen of your Windows client that is part of your
            server&apos;s domain, select &quot;Other user&quot;
          </li>
          <li>
            <p>
              Enter in the user name for one of the users you created, and their
              associated password like so:
            </p>
            <figure>
              <img
                src="/setup-adds/image020.png"
                alt="Prompts to enter username and password"
                className="w-full rounded-lg"
              />
            </figure>
          </li>
          <li>
            <p>You will be prompted to change your password, do so:</p>
            <figure>
              <img
                src="/setup-adds/image021.png"
                alt="Prompts to enter the current password and new password"
                className="w-full rounded-lg"
              />
            </figure>
          </li>
          <li>
            <p>
              Take a look at the start screen, and you should see that you are
              signed in:
            </p>
            <figure>
              <img
                src="/setup-adds/image022.png"
                alt="The Windows 8.1 start screen with logged in user Scott Pilgrim"
                className="w-full rounded-lg"
              />
            </figure>
            <p>
              Congratulations, you now have a working domain and users to log in
              as!
            </p>
          </li>
        </ol>

        <h3>Conclusion</h3>
        <p>
          After following along with this report, you should have a fully
          configured Windows 2012 Server that has Active Directory installed and
          that has been promoted to a Domain Controller. You should have basic
          organizational units and security groups in place, and the tools to add
          as many users as you need to these groups. You should also have the
          knowledge to be able to add Windows clients to your domain and login.
          All of this should have helped refine your skills using Windows
          PowerShell. Thank you for following along.
        </p>

        <h3>References</h3>
        <ol>
          <li>
            Microsoft Windows Server 2012 PowerShell Documentation:
            <ul>
              <li>
                <a href="https://docs.microsoft.com/en-us/powershell/module/activedirectory/get-adorganizationalunit?view=winserver2012-ps">
                  Get-ADOrganizationalUnit
                </a>
              </li>
              <li>
                <a href="https://docs.microsoft.com/en-us/powershell/module/addsadministration/get-adgroup?view=win10-ps">
                  Get-ADGroup
                </a>
              </li>
              <li>
                <a href="https://docs.microsoft.com/en-us/powershell/module/activedirectory/get-aduser?view=winserver2012-ps">
                  Get-ADUser
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="https://www.techrepublic.com/article/how-to-switch-between-gui-and-core-in-windows-server-2012-using-powershell/">
              TechRepublic article by Jesus Vigo, How to switch between GUI and
              Core in Windows Server 2012 using PowerShell
            </a>
          </li>
          <li>
            <a href="https://www.thomasmaurer.ch/2012/05/windows-server-2012-add-and-remove-gui/">
              Thomas Maurer article, Windows Server 2012 – Add and Remove GUI
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
