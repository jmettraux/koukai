
#
# _extensions.rb

class IndifferentHash < ::Hash

  def initialize(h)
    h.each { |k, v| self[k] = v }
  end
  def [](k); super(k.to_s); end
  def []=(k, v); super(k.to_s, v); end
end

class String

  def rstrip_lines

    lines.collect(&:rstrip).join("\n")
  end
end

