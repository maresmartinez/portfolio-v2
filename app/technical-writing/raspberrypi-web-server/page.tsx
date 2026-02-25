import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Create a Raspberry Pi Web Server",
};

export default function RaspberryPiWebServerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/technical-writing"
        className="inline-flex items-center gap-1.5 text-sm text-indigo-600 hover:underline mb-8"
      >
        <ArrowLeft size={14} /> Technical Writing
      </Link>

      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <h2>Create A Raspberry Pi Web Server</h2>

        <h3>Introduction</h3>
        <p>
          The purpose of this report is to explore how HTTP behaves as an
          Application layer protocol within the TCP/IP Protocol Suite. It will
          also explain the relationship HTTP has with TCP, and how TCP achieves
          reliable, connection-oriented communication within the Transport layer.
          This report will answer the question of why TCP is a more appropriate
          protocol for carrying HTTP than UDP.
        </p>
        <p>
          This report will also outline the procedures necessary to host a local
          web server on a personal computer. The process will be explored from
          not only an application perspective, but also a networking perspective.
          Therefore, the objective is not just to be able to create a web server,
          but also to understand how they work and what is happening behind the
          scenes. This web server experiment will provide further insight into
          HTTP and TCP.
        </p>

        <h3>Overview of HTTP Protocol</h3>
        <h4>What is HTTP?</h4>
        <p>
          Hypertext Transport Protocol (HTTP) is the application protocol that
          allows web browsers and web servers to communicate over the World Wide
          Web (WWW) [1]. It is a connectionless and text-based protocol.
          Essentially, it is through HTTP that clients, such as web browsers, are
          able to send requests to web servers and retrieve information such as a
          web page and images displayed on that site [1]. It is important to note
          that HTTP can also be used for other purposes, such as distributed
          object management systems [2]. That said, this report will only focus
          on HTTP in the context of the Web.
        </p>
        <h4>How does HTTP Work?</h4>
        <p>
          When a Uniform Resource Locator (URL) is typed into a web browser,
          there are actually quite a few things that go on in the background
          before the web page can be displayed. Here is how the browser turns a
          URL into a web page:
        </p>
        <figure>
          <img
            src="/raspberrypi-web-server/image001.png"
            alt="Diagram of how an http client and server communicate and pass data"
            className="w-full rounded-lg"
          />
          <figcaption>Figure 1: The process by which HTTP sends data</figcaption>
        </figure>
        <ol>
          <li>A URL is typed into a browser on a client.</li>
          <li>
            The browser connects to a Domain Name Server (DNS) and requests the
            corresponding IP address, which the DNS will respond with [1].
          </li>
          <li>
            The browser then connects to the web server (HTTP server) at that IP
            address and sends an HTTP request for the desired web page [1].
          </li>
          <li>
            The HTTP server receives the request on the port (web servers usually
            listen on <strong>port 80*</strong> by default [1]), and makes a
            socket connection [3].
          </li>
          <li>
            The HTTP server looks for the page, and if it finds it, it will send
            it back to the browser. If it cannot find it, it will send an HTTP
            404 error message [1].
          </li>
          <li>
            The web browser receives the page, and the connection is closed [1].
          </li>
          <li>
            As the browser parses the web page and finds other page elements that
            it needs from the web server (e.g. images, applets, etc.) it will
            create additional connections and requests for those elements [1].
          </li>
          <li>
            The process is repeated until everything on the web page is loaded
            and displayed on the browser&apos;s window [1].
          </li>
        </ol>
        <p>
          <strong>*</strong>If the web server is Secure (HTTPS, i.e. SSL or TLS
          certificates), it will listen on Port 443.
        </p>
        <p>
          After understanding how HTTP works, it is now possible to create a web
          server. The process begins in the following section.
        </p>

        <h3>Network Setup</h3>
        <p>
          In order to recreate this particular setup, two computers are required.
          One will act as the client that runs the web browser, and the other
          will act as a web server to respond to HTTP requests. For the remainder
          of this report, these two computers will be referred to as{" "}
          <strong>Client Computer</strong> and{" "}
          <strong>Server Computer</strong>, respectively. The two computers will
          need to be connected to the same LAN network in order for this setup to
          work. The following diagram describes the setup used for this report.
        </p>
        <figure>
          <img
            src="/raspberrypi-web-server/image003.png"
            alt="Network diagram of the environment needed to create a web server with a raspberry pi"
            className="w-full rounded-lg"
          />
          <figcaption>
            Figure 2: The network set-up used in this report (Created on Packet
            Tracer)
          </figcaption>
        </figure>

        <h3>Procedures</h3>
        <p>
          The following section describes, step-by-step, how to set up the web
          server, test it, and how to analyze the communication between the
          Client Computer and the Server Computer on Wireshark. It should be
          noted that the Client Computer used to create this report ran on
          Windows 10, and the Server Computer was a Raspberry Pi 3 B+ running on
          Raspbian GNU/Linux, Version 9. The commands used on the Server Computer
          should work for most Linux systems.
        </p>
        <h4>Server Installation</h4>
        <p>
          There are many open-source software projects out there that can easily
          turn a computer into an HTTP server. The HTTP server used in this
          report is the Apache HTTP Server Project. This software is available
          for Unix and Windows computers. With this software, a computer is able
          to provide a secure and efficient HTTP server that abides by the
          current HTTP standards [5]. Follow the steps below to install Apache2
          on a Linux Machine.
        </p>
        <p>
          The installation process on a Linux machine is quite simple. Simply
          open the command terminal (shortcut CTRL + ALT + T), and type in the
          following command:{" "}
          <strong>&quot;sudo apt-get install apache2 -y&quot;</strong>. If it
          was successfully installed, the output should look something like this:
        </p>
        <figure>
          <img
            src="/raspberrypi-web-server/image005.png"
            alt="Raspberry pi terminal after running sudo apt-get install apache2 -y"
            className="w-full rounded-lg"
          />
          <figcaption>
            Figure 3: Apache2 successfully installed on a Raspberry Pi
          </figcaption>
        </figure>

        <h4>Server Running</h4>
        <p>
          <em>Find the Server Computer&apos;s IP Address</em>
        </p>
        <p>
          To ensure that everything worked perfectly, find the Server
          Computer&apos;s IP address by typing the command &quot;hostname
          -I&quot; on the terminal, and visiting that IP address on the
          device&apos;s web browser.
        </p>
        <figure>
          <img
            src="/raspberrypi-web-server/image006.png"
            alt="Raspberry pi terminal after running hostname -I"
            className="w-full rounded-lg"
          />
          <figcaption>
            Figure 4: How to find the IP address on the Server Computer
          </figcaption>
        </figure>
        <p>
          <em>
            Visit the IP address from the Server Computer&apos;s web browser
          </em>
        </p>
        <p>
          The IP address should display the Apache2 Default Page, which looks
          something like this [6]:
        </p>
        <figure>
          <img
            src="/raspberrypi-web-server/image007.png"
            alt="Apache2 Ubuntu Default Page"
            className="w-full rounded-lg"
          />
          <figcaption>
            Figure 5: The Default Page for Apache2 server
          </figcaption>
        </figure>

        <h4>Webpage Hosted</h4>
        <p>
          <em>Visit directory that holds the Default Page</em>
        </p>
        <p>
          Once the HTTP server is running correctly, it can display HTML
          documents to the local network simply by placing them in the
          appropriate directory. Visit that directory by typing in the following
          command on the terminal of the Server Computer:{" "}
          <strong>&quot;cd /var/www/html&quot;</strong>.
        </p>
        <p>
          <em>Remove the default index.html from /var/www/html</em>
        </p>
        <p>
          Currently, the index.html which holds the Default Page from section
          4.2 resides there. Feel free to delete or back-up that document
          somewhere else on the Server Computer. Just ensure that the current
          index.html is not in the directory <strong>/var/www/html</strong>
        </p>
        <p>
          <em>Write a custom index.html</em>
        </p>
        <p>
          Any index.html file that is placed in <strong>/var/www/html</strong>{" "}
          will be displayed when visiting the Server Computer&apos;s IP address.
          The script below is what was used in this report. Copy this script into
          index.html using any text editor (Raspberry Pi users can use leafpad)
          and save it.
        </p>
        <figure>
          <pre>
            <code>{`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="author" content="Mariel Martinez">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>TELE13167</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <header>
    <h1>Assignment 2</h1>
  </header>
  <main>
    <div class="container">
      <p>Here is my website!</p>
      <img src="images/pikachu.png" alt="Pikachu">
      <br>
      <img src="images/charmander.png" alt="Charmander">
      <img src="images/bulbasaur.png" alt="Bulbasaur">
      <img src="images/squirtle.png" alt="Squirtle">
    </div>
  </main>
  <footer> Copyright &copy; Mariel Martinez </footer>
</body>
</html>`}</code>
          </pre>
          <figcaption>
            Figure 6: The index.html file used in this report
          </figcaption>
        </figure>
        <p>
          <em>Write the styles.css file</em>
        </p>
        <p>
          Create a directory called &quot;css&quot; by running the command
          &quot;mkdir css&quot; within the <strong>/var/www/html</strong>{" "}
          directory. The CSS file below is what was used in this report. Copy
          this script into a file called styles.css in the css directory.
        </p>
        <figure>
          <pre>
            <code>{`body {
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
}

.container {
  width: 80%;
  margin: 20px auto;
}

header {
  border-bottom: 1px solid black;
}

footer {
  border-top: 1px solid black;
  padding: 20px;
}`}</code>
          </pre>
          <figcaption>
            Figure 7: The style.css file used in this report
          </figcaption>
        </figure>
        <p>
          <em>Save images in the correct directory.</em>
        </p>
        <p>
          For this report, there were four images used. It is good practice to
          save those in a separate directory from index.html. Return to the html
          directory from the css directory by simply typing the command
          &quot;cd ..&quot; and make a new directory with the command &quot;mkdir
          images&quot;. If the html file in Step 3 was used, then four images
          with the following names must be saved in this directory: bulbasaur.png,
          charmander.png, pikachu.png, and squirtle.png.
        </p>
        <p>
          <em>Ensure the file structure is correct</em>
        </p>
        <p>
          To ensure that the structure of this particular website is correct,
          return to /var/www/html by running the command &quot;cd
          /var/www/html&quot; and then running the command &quot;tree&quot;. If
          Steps 3-6 were followed correctly, the output should look something
          like this:
        </p>
        <figure>
          <img
            src="/raspberrypi-web-server/image009.png"
            alt="Raspberry pi terminal showing the file structure of the web server directory"
            className="w-full rounded-lg"
          />
          <figcaption>
            Figure 8: The file structure of the website used in this report
          </figcaption>
        </figure>

        <h4>Web Page Downloaded</h4>
        <p>
          Now that the HTML file, images and directories are in the correct
          place, visit the IP address of the Server Computer again. If the
          scripts provided in Section 4.3 were used, it should look something
          like this:
        </p>
        <figure>
          <img
            src="/raspberrypi-web-server/image010.png"
            alt="Webpage displaying the html from figure 6"
            className="w-full rounded-lg"
          />
          <figcaption>
            Figure 9: The website created for this report being visited from the
            Server Computer.
          </figcaption>
        </figure>
        <p>
          It is now possible to visit this web page through any computer that is
          connected to the same LAN as the Server Computer. The next section
          describes how to capture Wireshark Activity from the Client Computer.
        </p>

        <h4>Wireshark Activity</h4>
        <p>
          The steps in this section should be followed from the Client Computer.
          That said, the Server Computer must still be powered on in order for
          everything to work correctly.
        </p>
        <p>
          <em>Clear Cache</em>
        </p>
        <p>
          If, during testing, the IP address of the Server Computer was ever
          visited from the Client Computer, the Client Computer may have cached
          some images or files from the Server Computer&apos;s web page. When
          Wireshark is running, the goal is to be able to capture all the packets
          from communication. For this reason, the Client Computer&apos;s web
          browser cache should be cleared.
        </p>
        <p>
          To clear the cache in Chrome, simply go to &quot;Settings,&quot; type
          in &quot;Cache,&quot; click &quot;Clear browsing data&quot; and select
          the option for &quot;Cached images and files&quot; (there is no need to
          clear browsing history or cookies).
        </p>
        <p>
          <em>Begin capturing packets from Wireshark</em>
        </p>
        <p>
          Open the Wireshark Network Analyzer to capture packets from the HTTP
          requests that are about to be sent. If connected to the LAN via Wi-Fi,
          select that option:
        </p>
        <figure>
          <img
            src="/raspberrypi-web-server/image012.png"
            alt="Wireshark activity capturing packets from accessing the server"
            className="w-full rounded-lg"
          />
          <figcaption>Starting a Wireshark capture session</figcaption>
        </figure>
        <p>
          <em>Visit the IP address of the Server Computer</em>
        </p>
        <p>
          Without visiting any other websites, navigate to the IP address of the
          Server Computer from a web browser on the Client Computer.
        </p>
        <figure>
          <img
            src="/raspberrypi-web-server/image014.png"
            alt="The view of the html page from the client computer"
            className="w-full rounded-lg"
          />
          <figcaption>
            The website created for this report being visited from the Client
            Computer.
          </figcaption>
        </figure>
        <p>
          <em>Close Web Page and Stop Wireshark</em>
        </p>
        <p>
          Wireshark has now captured all the packets that are required for this
          exercise. Stop capturing by pressing the red square on the toolbar of
          Wireshark. The packets that were captured will be analyzed in the
          following section.
        </p>

        <h3>Observations and Analysis of Results</h3>
        <h4>TCP Connection Set-Up</h4>
        <p>
          By the time the exercise is complete, Wireshark will have captured
          packets from many different types of connections. The packets which are
          important to HTTP can be filtered using the display filter
          &quot;tcp.port == 80&quot; [7]. The filter should look something like
          this:
        </p>
        <figure>
          <img
            src="/raspberrypi-web-server/image016.png"
            alt="Wireshark packets filtered from port 80"
            className="w-full rounded-lg"
          />
          <figcaption>
            Figure 12: The website created for this report being visited from
            the Client Computer.
          </figcaption>
        </figure>
        <p>
          Notice that the two IP addresses shown in the display filter
          (192.168.0.100 and 192.168.0.244) correspond with the IP addresses of
          the Client Computer and the Server Computer from this network setup
          (see Figure 2). This is because the Server Computer&apos;s web page
          was the only website visited by the Client Computer during the capture
          session.
        </p>
        <p>
          The TCP connection set up can be seen in the first three TCP packets in
          this display filter. The Source (Client Computer) sends a TCP packet
          with a SYN flag to the Destination (Server Computer), that is listening
          on port 80. The Server Computer responds with a TCP packet with an SYN
          and ACK flag up, and finally the Source replies with an TCP packet with
          an ACK flag up. This creates a reliable, full-duplex connection. Now,
          data can be reliably sent between the two computers. Notice that the
          first HTTP packet is only sent after this connection is made. Otherwise,
          it would not be a reliable connection.
        </p>

        <h4>3-Way Handshake</h4>
        <p>
          In order to easily see the 3-Way handshake, simply click
          &quot;Statistics&quot; in the tool bar, and then &quot;Flow
          Graph.&quot; Then, ensure that the checkbox for &quot;Limit to display
          filter&quot; is on so that only the packets on Port 80 are shown. Then
          select the flow type &quot;TCP Flows.&quot;
        </p>
        <p>
          Notice in the figure below that there are three different colours.
          These denote different TCP connections that are being made between the
          Client Computer and the Server Computer. The first three packets in
          each of these connections corresponds with what one would expect from a
          three way handshake (SYN first, SYN+ACK, then ACK).
        </p>
        <p>
          It was explained in Section 2 that there are multiple connections made
          between a client and a web server. A new connection is made for
          different images and files that are needed to load a full web page. As
          pictured above in the Wireshark capture, even for a simple web page
          like the one in this exercise, there are many http requests and
          responses that needed to be made to load the full page.
        </p>
        <figure>
          <img
            src="/raspberrypi-web-server/image018.png"
            alt="Wireshark packets filtered from port 80"
            className="w-full rounded-lg"
          />
          <figcaption>
            Figure 13: The 3-Way Handshakes from Wireshark
          </figcaption>
        </figure>

        <h4>TCP Connection Teardown</h4>
        <p>
          A TCP connection is ended with a FIN flag in one of the TCP packets.
          See in Figure X below that the first FIN packet is sent by the Server
          Computer, and then acknowledged by the Client Computer. That happens
          once in green and once in grey. These are two separate TCP connections
          made between each computer that are closed separately.
        </p>
        <figure>
          <img
            src="/raspberrypi-web-server/image021.png"
            alt="Wireshark packets showing the TCP connection teardown"
            className="w-full rounded-lg"
          />
          <figcaption>
            Figure 14: The TCP Packets with the FIN flags
          </figcaption>
        </figure>

        <h4>HTTP Request/Reply</h4>
        <p>
          The HTTP Stream can be followed on Wireshark by right-clicking on an
          HTTP packet, selecting &quot;Follow&quot; and then &quot;HTTP
          Stream&quot;.
        </p>
        <figure>
          <img
            src="/raspberrypi-web-server/image024.jpg"
            alt="Wireshark options to access HTTP streams"
            className="w-full rounded-lg"
          />
          <figcaption>Figure 15: How to see the HTTP Streams</figcaption>
        </figure>
        <p>
          This will open a window that will show the HTTP packets with the
          corresponding request/reply packet. In the figure below, the red
          packets are requests from the Client Computer, and the blue packets are
          replies from the Server Computer. The reply in the figure below contain
          Content-type that is text/html. This is actually the index.html file
          that will be displayed by the browser. The subsequent replies and
          requests would contain the data for the four images that are displayed
          on the webpage and even the styles.css file.
        </p>
        <figure>
          <img
            src="/raspberrypi-web-server/image025.png"
            alt="HTTP steams showing GET request for index.html"
            className="w-full rounded-lg"
          />
          <figcaption>
            Figure 16: The HTTP Stream showing the index.html file being sent to
            the Client Computer
          </figcaption>
        </figure>

        <h3>Conclusion</h3>
        <p>
          Overall, this exercise showed how much goes on behind the scenes when
          visiting a website. There were many different connections that needed to
          be made to ensure that the data was properly sent from the Server
          Computer to the Client Computer. It was important that these HTTP
          requests were made on top of the TCP protocol, otherwise data may have
          been lost. This exercise provided a good practical example to help
          explore the HTTP protocol and see how data is sent to web browsers.
        </p>

        <h3>References</h3>
        <ol>
          <li>
            <a href="https://web.stanford.edu/class/msande91si/www-spr04/readings/week1/InternetWhitepaper.htm">
              Schuler, R. (2018). How Does the Internet Work?. [online]
              Web.stanford.edu.
            </a>
          </li>
          <li>
            <a href="http://www.silicon-press.com/briefs/brief.http/brief.pdf">
              Kristol, D. (n.d.). HTTP. [online] Silicon-Press
            </a>
          </li>
          <li>
            <a href="https://www.utdallas.edu/~chung/SA/2client.pdf">
              Chung, L. (n.d.). Client-Server Architecture. [online]. University
              of Texas
            </a>
          </li>
          <li>
            <a href="https://www.instantssl.com/ssl-certificate-products/https.html">
              Instant SSL (n.d.). What is HTTPS?. [online]. Instant SSL.
            </a>
          </li>
          <li>
            <a href="https://httpd.apache.org/">
              Apache Software Foundation. (2018). HTTP Server Project. [online].
              Apache.
            </a>
          </li>
          <li>
            <a href="https://medium.com/@hugefan/setting-apache-virtual-hosts-in-ubuntu-17-04-88a58642940d">
              Fan, H. (2017). Setting Apache Virtual Hosts in Ubuntu 17.04.
              [online]. Medium.
            </a>
          </li>
          <li>
            <a href="https://wiki.wireshark.org/Hyper_Text_Transfer_Protocol">
              Meier, B. (2011). Hyper Text Transfer Protocol. [online] Wireshark
            </a>
          </li>
          <li>
            <a href="https://theinfowolf.com/index.php/tut-home/creating-a-raspberry-pi-3-model-b-web-server/">
              Wolf, I. (n.d.). Creating a Raspberry Pi 3 Model B Web Server.
              [Online]. The Info Wolf
            </a>
          </li>
          <li>
            Lecture material by Tarek El Salti from TELE 13167 – Intro to Data
            Communications and Networking, taken at Sheridan College (2018)
          </li>
        </ol>
      </div>
    </div>
  );
}
