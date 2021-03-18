# Evaluator

The objective of this project is to create a website with computer science problems. (Reference: [hackerrank](https://www.hackerrank.com/), [leetcode](https://leetcode.com/), [pbinfo](https://www.pbinfo.ro/), [infoarena](http://infoarena.ro/))
The user must be able to run the code and display the output / error.
When the user thinks that he has a correct solution, he must be able to publish his code and it will be analyzed, then displaying its correctness.
Back-end will use Django and for front-end React.


For now, the goal is for the user to be able to run Python code.
For now, I need to find a way to run the Python code from the user in a safe way.

# Ideas for running Python safely

## In-built functions
exec, eval: too unsafe, takes too much time to implement something decent

## Python sandboxed
[Really good article of the options available for sandboxing](https://www.software.ac.uk/blog/2017-11-23-executing-python-code-submitted-web-service)

To check the realiability of the sandbox, check [this](https://book.hacktricks.xyz/misc/basic-python/bypass-python-sandboxes)

[pysandbox](https://github.com/vstinner/pysandbox) - deprecated

[PyPy sandbox](https://doc.pypy.org/en/latest/sandbox.html) - unmaintained

[Docker](https://www.docker.com/) - very good idea, hard to set up, could use multiple coding languages

[epicbox](https://pypi.org/project/epicbox/) really good combination with Docker

## Python in the browser
[Really good article about the available options](https://anvil.works/blog/python-in-the-browser-talk)

They run in the browser, meaning that security is not concern and the execution is handled on the user's machine.

[PyPyJS](https://github.com/pypyjs) - python 2.7, unmaintained, 12mb script import

[Brython](https://brython.info/) - python 3.9.0, no imports, good idea

[Skulpt](http://skulpt.org/) - python 2.7, limited imports(?)

[Anvil](https://anvil.works/) - python 2.7(?), website builder, pay to remove sponsor header

## Conclusion
Will maybe try Brython, and later switch to Docker.

# Contributing
Pull requests, ideas, anything is welcome.
