package io.microprofile.showcase.vote;

import java.io.File;
import java.util.Properties;

import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.asset.EmptyAsset;
import org.jboss.shrinkwrap.api.spec.WebArchive;
import org.jboss.shrinkwrap.resolver.api.maven.Maven;
import org.jboss.shrinkwrap.resolver.api.maven.ScopeType;
import org.wildfly.swarm.Swarm;

public class ArquillianTestUtils {

	public static WebArchive deploy() {

		File[] deps = Maven.resolver()
				.loadPomFromFile("pom.xml")
				.importDependencies(ScopeType.COMPILE,ScopeType.RUNTIME,ScopeType.TEST).resolve()
				.withTransitivity().asFile();
		WebArchive webArchive = ShrinkWrap.create(WebArchive.class, "test.war")
				.addPackages(true, "io.microprofile.showcase.vote")
				.addAsLibraries(deps)
				.addAsWebInfResource(EmptyAsset.INSTANCE,"beans.xml");
		System.out.println(webArchive.toString(true));

		return webArchive;
	}

	public static Swarm newContainer() throws Exception {
		Properties properties = new Properties();
		properties.put("swarm.http.port", 8080);
		properties.put("java.util.logging.manager", "org.jboss.logmanager.LogManager");
		Swarm swarm = new Swarm(properties);
		return swarm.withProfile("defaults");
	}
}
