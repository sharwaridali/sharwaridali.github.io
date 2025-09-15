import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Download,
  Shield,
  Code,
  BookOpen,
  Award,
  Users,
  Target,
  Sun,
  Moon,
  Menu,
  X,
  ExternalLink
} from 'lucide-react';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  fork: boolean;
}

function App() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    fetch('https://api.github.com/users/sharwaridali/repos')
      .then(response => response.json())
      .then((data: GitHubRepo[]) => {
        const filteredRepos = data.filter(repo => !repo.fork);
        setRepos(filteredRepos);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching repos:', error);
        setLoading(false);
      });
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="font-bold text-2xl text-purple-600 dark:text-purple-400" style={{ fontFamily: 'cursive' }}>
                Sharwari Dali
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <button onClick={() => scrollToSection('home')} className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Home
                </button>
                <button onClick={() => scrollToSection('about')} className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  About
                </button>
                <button onClick={() => scrollToSection('projects')} className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Projects
                </button>
                <button onClick={() => scrollToSection('contact')} className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Contact
                </button>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center space-x-2">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col space-y-4">
                  <button onClick={() => scrollToSection('home')} className="text-left hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                    Home
                  </button>
                  <button onClick={() => scrollToSection('about')} className="text-left hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                    About
                  </button>
                  <button onClick={() => scrollToSection('projects')} className="text-left hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                    Projects
                  </button>
                  <button onClick={() => scrollToSection('contact')} className="text-left hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                    Contact
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="pt-20 pb-16 px-4 text-center bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-purple-900/20">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <img
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
                alt="Sharwari Dali"
                className="w-40 h-40 rounded-full object-cover mx-auto mb-6 border-4 border-purple-200 dark:border-purple-600 shadow-xl"
              />
              <h1 className="text-4xl md:text-5xl font-bold text-purple-600 dark:text-purple-400 mb-6">
                Hi, I'm Sharwari Dali
              </h1>
              
              <figure className="text-center">
                <blockquote className="text-2xl md:text-3xl font-light italic text-purple-600 dark:text-purple-400 mb-2" style={{ fontFamily: 'cursive' }}>
                  "With great power comes great responsibility."
                </blockquote>
                <figcaption className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  — Marvel
                </figcaption>
              </figure>
              
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
                To me, cybersecurity isn't just a profession — it's a commitment.<br />
                With the power to protect systems and data comes the responsibility to act with vigilance, integrity, and foresight.
              </p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 px-4 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-600 dark:text-purple-400 mb-12">
              About Me
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
                  Professional Background
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  I'm a passionate cybersecurity professional with expertise in penetration testing, vulnerability assessment, and security research. My journey in cybersecurity began with a fascination for understanding how systems work and how they can be protected from malicious actors.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  With a strong foundation in both offensive and defensive security practices, I specialize in identifying vulnerabilities, developing mitigation strategies, and helping organizations build robust security frameworks.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
                  Core Values
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">Security First</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Always prioritizing the protection of data and systems above all else.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Target className="w-6 h-6 text-purple-600 dark:text-purple-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">Precision</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Meticulous attention to detail in every security assessment and implementation.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">Continuous Learning</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Staying updated with the latest threats, tools, and defensive techniques.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills & Expertise */}
            <div className="mb-16">
              <h3 className="text-2xl font-semibold text-center mb-8 text-gray-800 dark:text-gray-200">
                Skills & Expertise
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Shield className="w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Penetration Testing</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Comprehensive security assessments, vulnerability identification, and exploit development
                  </p>
                </div>
                <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Code className="w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Security Research</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    In-depth analysis of emerging threats, vulnerability research, and security tool development
                  </p>
                </div>
                <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Users className="w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Security Consulting</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Strategic security planning, risk assessment, and implementation guidance
                  </p>
                </div>
              </div>
            </div>

            {/* Education & Certifications */}
            <div>
              <h3 className="text-2xl font-semibold text-center mb-8 text-gray-800 dark:text-gray-200">
                Education & Achievements
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-800 dark:to-purple-900/20 rounded-lg">
                  <Award className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-4" />
                  <h4 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Academic Excellence</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Completed comprehensive dissertation on QR Code Security vulnerabilities, contributing valuable research to the cybersecurity community.
                  </p>
                </div>
                <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-800 dark:to-purple-900/20 rounded-lg">
                  <BookOpen className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-4" />
                  <h4 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Research Focus</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Specialized in emerging security threats, with particular expertise in QR code vulnerabilities and penetration testing methodologies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-600 dark:text-purple-400 mb-12">
              Projects
            </h2>

            {/* Featured Projects */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
                <div className="mb-4">
                  <span className="inline-block bg-purple-600 text-white text-xs px-3 py-1 rounded-full mb-3">
                    Dissertation
                  </span>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                    QR Code Security Research
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    A comprehensive dissertation on the vulnerabilities in QR code technology, attack vectors, and mitigation strategies — combining deep research with real-world testing.
                  </p>
                  <a
                    href="https://github.com/sharwaridali/qrcode-generator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                  >
                    <span>View Project</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
                <div className="mb-4">
                  <span className="inline-block bg-purple-600 text-white text-xs px-3 py-1 rounded-full mb-3">
                    Security
                  </span>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                    Penetration Testing Report
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    A custom-built suite of penetration testing tools and scripts for network analysis, web application scanning, and exploit automation — designed with a red-team mindset.
                  </p>
                  <a
                    href="https://github.com/sharwaridali/penetration-testing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                  >
                    <span>View Report</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* GitHub Projects */}
            <div>
              <h3 className="text-2xl font-semibold text-center mb-8 text-gray-800 dark:text-gray-200">
                GitHub Projects
              </h3>
              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                  <p className="mt-4 text-gray-600 dark:text-gray-300">Loading projects...</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {repos.map((repo) => (
                    <div
                      key={repo.id}
                      className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:transform hover:-translate-y-1 transition-all duration-300"
                    >
                     {/* Project Image Placeholder */}
                     <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-gray-700 dark:to-purple-800/30 rounded-lg mb-4 flex items-center justify-center">
                       <div className="text-center">
                         <Code className="w-12 h-12 text-purple-400 dark:text-purple-300 mx-auto mb-2" />
                         <p className="text-sm text-gray-500 dark:text-gray-400">Project Preview</p>
                       </div>
                     </div>
                      <h4 className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-3">
                        {repo.name}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">
                        {repo.description || 'No description provided.'}
                      </p>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors text-sm"
                      >
                        <Github className="w-4 h-4" />
                        <span>View on GitHub</span>
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 px-4 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-600 dark:text-purple-400 mb-12">
              Get In Touch
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
                  Let's Connect
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  I'm always interested in discussing cybersecurity challenges, research opportunities, and potential collaborations. Whether you're looking for security consulting, have questions about my research, or want to explore partnership opportunities, I'd love to hear from you.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">Email</h4>
                      <a href="mailto:sharwari.dali@example.com" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
                        sharwari.dali@example.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                      <Linkedin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">LinkedIn</h4>
                      <a href="https://linkedin.com/in/sharwaridali" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
                        linkedin.com/in/sharwaridali
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                      <Github className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">GitHub</h4>
                      <a href="https://github.com/sharwaridali" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
                        github.com/sharwaridali
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">Location</h4>
                      <p className="text-gray-600 dark:text-gray-300">Available for remote work worldwide</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-800 dark:to-purple-900/20 rounded-lg p-8">
                <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
                  Areas of Interest
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-gray-200">Security Research</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Vulnerability research, threat analysis, and security tool development</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-gray-200">Penetration Testing</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Web application, network, and infrastructure security assessments</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-gray-200">Security Consulting</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Strategic security planning and implementation guidance</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-gray-200">Training & Education</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Cybersecurity awareness and technical training programs</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-purple-200 dark:border-purple-700">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Download my resume for detailed information about my experience and qualifications.
                  </p>
                  <button className="inline-flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Download Resume</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              © 2024 Sharwari Dali. All rights reserved.
            </p>
            <div className="flex justify-center space-x-6">
              <a href="https://github.com/sharwaridali" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/in/sharwaridali" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:sharwari.dali@example.com" className="text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;